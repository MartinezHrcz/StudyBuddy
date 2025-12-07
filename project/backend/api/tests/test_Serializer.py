from django.test import TestCase
from django.contrib.auth.models import User
from api.models import Quiz, Question, Choice, QuizAttempt
from api.serializers import (
    RegisterSerializer,

    ChoiceSerializer,

    QuestionSerializer,

    QuizSerializer,

    QuizAttemptSerializer
)

class TestSerializer(TestCase):

    def setUp(self):
        self.user = User.objects.create_user(
            username='quiztaker',
            email='taker@test.com',
            password='testpassword'
        )
        self.quiz = Quiz.objects.create(topic='Python Basics')
        self.question_1 = Question.objects.create(
            quiz=self.quiz,
            prompt='Python is interpreted.',
            is_true_false=True
        )
        self.choice_1 = Choice.objects.create(
            question=self.question_1,
            text='True',
            is_correct=True
        )
        self.choice_2 = Choice.objects.create(
            question=self.question_1,
            text='False',
            is_correct=False
        )
        self.attempt = QuizAttempt.objects.create(
            user=self.user,
            quiz=self.quiz,
            correct=10,
            total=10
        )

    def test_register_creation_success(self):
        data = {
            'username': 'newuser',
            'email': 'new@user.com',
            'password': 'safeandstrongpassword'
        }
        serializer = RegisterSerializer(data=data)
        self.assertTrue(serializer.is_valid(raise_exception=True))

        user = serializer.save()

        self.assertEqual(user.username, 'newuser')
        self.assertIsInstance(user, User)
        self.assertTrue(user.check_password('safeandstrongpassword'))
        self.assertEqual(User.objects.count(), 2)

    def test_register_creation_missing_field(self):
        data = {
            'email': 'invalid@user.com',
            'password': 'safeandstrongpassword'
        }
        serializer = RegisterSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('username', serializer.errors)
        self.assertIn('This field is required.', serializer.errors['username'])

    def test_quiz_attempt_deserialization_creation(self):
        new_attempt_data = {
            'user': self.user.id,
            'quiz': self.quiz.id,
            'correct': 7,
            'total': 10,
        }
        serializer = QuizAttemptSerializer(data=new_attempt_data)

        self.assertTrue(serializer.is_valid(raise_exception=True))
        attempt = serializer.save()

        self.assertIsInstance(attempt, QuizAttempt)
        self.assertEqual(attempt.correct, 7)
        self.assertEqual(attempt.user, self.user)

    def test_choice_serialization(self):
        serializer = ChoiceSerializer(self.choice_1)
        data = serializer.data

        self.assertEqual(data['text'], 'True')
        self.assertTrue(data['is_correct'])
        self.assertIn('id', data)

    def test_question_serialization_with_choices(self):
        serializer = QuestionSerializer(self.question_1)
        data = serializer.data

        self.assertEqual(data['prompt'], 'Python is interpreted.')
        self.assertTrue(data['is_true_false'])

        self.assertIn('choices', data)
        self.assertEqual(len(data['choices']), 2)

        choice_texts = [c['text'] for c in data['choices']]
        self.assertIn('True', choice_texts)
        self.assertIn('False', choice_texts)

    def test_quiz_serialization_with_nesting(self):
        serializer = QuizSerializer(self.quiz)
        data = serializer.data

        self.assertEqual(data['topic'], 'Python Basics')

        self.assertIn('questions', data)
        self.assertEqual(len(data['questions']), 1)
        question_data = data['questions'][0]
        self.assertEqual(question_data['prompt'], 'Python is interpreted.')

        self.assertIn('choices', question_data)
        self.assertEqual(len(question_data['choices']), 2)

        correct_choice = next(c for c in question_data['choices'] if c)