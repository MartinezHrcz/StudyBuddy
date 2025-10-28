from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Quiz, Question, Choice, QuizAttempt
from .serializers import QuizSerializer, RegisterSerializer, QuizAttemptSerializer
from .openai_client import generate_quiz
from rest_framework import status

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
    answers = request.data.get('answers', {})  # {question_id: choice_id}
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
    return Response({'correct': correct, 'total': total})

@api_view(['GET'])
def profile_stats(request):
    user = request.user
    attempts = QuizAttempt.objects.filter(user=user)
    total_quizzes = attempts.count()
    total_questions = sum(a.total for a in attempts)
    total_correct = sum(a.correct for a in attempts)
    pct = (total_correct / total_questions * 100) if total_questions else 0
    return Response({
        'username': user.username,
        'total_quizzes': total_quizzes,
        'total_questions': total_questions,
        'total_correct': total_correct,
        'accuracy_percent': round(pct,2)
    })

