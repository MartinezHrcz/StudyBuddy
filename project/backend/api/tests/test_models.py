from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from api.models import Quiz, Question, Choice, QuizAttempt

User = get_user_model()


class QuizModelTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='quiz_maker', password='testpassword')

    def test_quiz_creation(self):
        quiz = Quiz.objects.create(owner=self.user, topic='History')
        self.assertTrue(isinstance(quiz, Quiz))
        self.assertEqual(quiz.topic, 'History')
        self.assertEqual(quiz.owner, self.user)

    def test_quiz_str_representation(self):
        quiz = Quiz.objects.create(owner=self.user, topic='Science')
        self.assertEqual(str(quiz), f'Quiz {quiz.id} - Science')

    def test_quiz_owner_can_be_null(self):
        quiz = Quiz.objects.create(topic='Default Quiz', owner=None)
        self.assertIsNone(quiz.owner)