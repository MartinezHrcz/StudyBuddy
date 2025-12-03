from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Quiz, Question, Choice, QuizAttempt
from .serializers import QuizSerializer, RegisterSerializer, QuizAttemptSerializer
from .openai_client import generate_quiz, get_chat_response
from rest_framework import status
from django.db.models import Sum, Count, F, Value, FloatField, ExpressionWrapper, Case, When, Q
from django.db.models.functions import Coalesce, Cast

XP_PER_CORRECT = 10   
XP_PER_LEVEL = 100    

@api_view(['POST'])
@permission_classes([AllowAny])
def register_view(request):
    serializer = RegisterSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response({'id': user.id, 'username': user.username}, status=201)
    return Response(serializer.errors, status=400)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_with_ai_view(request):
    message = request.data.get('message')
    if not message:
        return Response({'error': 'Message is required'}, status=400)
    try:
        response_text = get_chat_response(message)
        return Response({'reply': response_text})
    except RuntimeError as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_quiz_view(request):
    topic = request.data.get('topic')
    if not topic:
        return Response({'error': 'topic required'}, status=400)

    try:
        data = generate_quiz(topic)
    except RuntimeError as e:
        return Response({'error': str(e)}, status=500)

    quiz = Quiz.objects.create(owner=request.user, topic=topic)
    for item in data:
        q = Question.objects.create(
            quiz=quiz,
            prompt=item.get('prompt', ''),
            is_true_false=(item.get('type') == 'tf')
        )
        if item.get('type') == 'mcq':
            for ch in item.get('choices', []):
                Choice.objects.create(
                    question=q,
                    text=ch.get('text', ''),
                    is_correct=bool(ch.get('is_correct', False))
                )
        elif item.get('type') == 'tf':
            correct = bool(item.get('correct', True))
            Choice.objects.create(question=q, text='True', is_correct=correct)
            Choice.objects.create(question=q, text='False', is_correct=not correct)

    serializer = QuizSerializer(quiz)
    return Response(serializer.data, status=201)

@api_view(['GET'])
def quiz_detail(request, quiz_id):
    try:
        quiz = Quiz.objects.get(pk=quiz_id)
    except Quiz.DoesNotExist:
        return Response({'error':'not found'}, status=404)
    serializer = QuizSerializer(quiz)
    return Response(serializer.data)

@api_view(['POST'])
def submit_quiz(request, quiz_id):
    try:
        quiz = Quiz.objects.get(pk=quiz_id)
    except Quiz.DoesNotExist:
        return Response({'error':'not found'}, status=404)
    answers = request.data.get('answers', {})  
    total = 0
    correct = 0
    for q in quiz.questions.all():
        total += 1
        selected = answers.get(str(q.id))
        if selected:
            try:
                choice = Choice.objects.get(pk=int(selected))
                if choice.is_correct:
                    correct += 1
            except Choice.DoesNotExist:
                pass
    
    
    attempt = QuizAttempt.objects.create(user=request.user, quiz=quiz, correct=correct, total=total)
    
    
    xp_earned = correct * XP_PER_CORRECT
    
    return Response({
        'correct': correct, 
        'total': total,
        'xp_earned': xp_earned  
    })

@api_view(['GET'])
def profile_stats(request):
    user = request.user
    attempts = QuizAttempt.objects.filter(user=user)
    total_quizzes = attempts.count()
    total_questions = sum(a.total for a in attempts)
    total_correct = sum(a.correct for a in attempts)
    pct = (total_correct / total_questions * 100) if total_questions else 0
    
    total_xp = total_correct * XP_PER_CORRECT
    
    current_level = (total_xp // XP_PER_LEVEL) + 1

    xp_progress_in_level = total_xp % XP_PER_LEVEL
    
    return Response({
        'username': user.username,
        'total_quizzes': total_quizzes,
        'total_questions': total_questions,
        'total_correct': total_correct,
        'accuracy_percent': round(pct,2),
        'total_xp': total_xp,
        'current_level': current_level,
        'xp_progress': xp_progress_in_level,
        'xp_per_level': XP_PER_LEVEL
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def leaderboard_view(request):
    """Return top users for a given metric."""
    metric = request.GET.get('metric', 'total_correct')
    try:
        limit = int(request.GET.get('limit', 10))
    except ValueError:
        limit = 10

    users = User.objects.annotate(
        total_correct=Coalesce(Sum('quizattempt__correct'), Value(0)),
        total_questions=Coalesce(Sum('quizattempt__total'), Value(0)),
        total_quizzes=Coalesce(Count('quizattempt'), Value(0)),
    ).annotate(
        accuracy=Case(
            When(total_questions=0, then=Value(0.0)),
            default=ExpressionWrapper(Cast(F('total_correct'), FloatField()) / F('total_questions'), output_field=FloatField()),
            output_field=FloatField(),
        )
    )

    if metric == 'total_correct':
        order_field = 'total_correct'
    elif metric == 'total_quizzes':
        order_field = 'total_quizzes'
    else:
        order_field = 'accuracy'

    ordered = users.order_by(F(order_field).desc(nulls_last=True))[:limit]

    data = []
    for u in ordered:
        data.append({
            'id': u.id,
            'username': u.username,
            'total_correct': int(u.total_correct or 0),
            'total_questions': int(u.total_questions or 0),
            'total_quizzes': int(u.total_quizzes or 0),
            'accuracy': round(float(u.accuracy or 0.0) * 100, 2),
        })

    return Response({'metric': metric, 'limit': limit, 'results': data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def leaderboard_my_rank(request):
    """Return the authenticated user's rank for a given metric and their stats."""
    user = request.user
    metric = request.GET.get('metric', 'accuracy')

    # compute user's own stats
    agg = QuizAttempt.objects.filter(user=user).aggregate(
        total_correct=Coalesce(Sum('correct'), Value(0)),
        total_questions=Coalesce(Sum('total'), Value(0)),
        total_quizzes=Coalesce(Count('id'), Value(0)),
    )
    total_correct = agg.get('total_correct') or 0
    total_questions = agg.get('total_questions') or 0
    total_quizzes = agg.get('total_quizzes') or 0
    if total_questions:
        accuracy = float(total_correct) / float(total_questions)
    else:
        accuracy = 0.0

    users = User.objects.annotate(
        total_correct=Coalesce(Sum('quizattempt__correct'), Value(0)),
        total_questions=Coalesce(Sum('quizattempt__total'), Value(0)),
        total_quizzes=Coalesce(Count('quizattempt'), Value(0)),
    ).annotate(
        accuracy=Case(
            When(total_questions=0, then=Value(0.0)),
            default=ExpressionWrapper(Cast(F('total_correct'), FloatField()) / F('total_questions'), output_field=FloatField()),
            output_field=FloatField(),
        )
    )

    if metric == 'total_correct':
        metric_value = total_correct
        annotated = users.annotate(metric=F('total_correct'))
    elif metric == 'total_quizzes':
        metric_value = total_quizzes
        annotated = users.annotate(metric=F('total_quizzes'))
    else:
        metric_value = accuracy
        annotated = users.annotate(metric=F('accuracy'))

    higher_count = annotated.filter(metric__gt=metric_value).count()
    rank = higher_count + 1

    return Response({
        'id': user.id,
        'username': user.username,
        'metric': metric,
        'metric_value': (round(metric_value*100,2) if metric == 'accuracy' else int(metric_value)),
        'rank': rank,
        'total_quizzes': int(total_quizzes),
        'total_questions': int(total_questions),
        'total_correct': int(total_correct),
    })