from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth.models import User
from unittest.mock import patch, MagicMock
from ..models import Quiz, Question, Choice, QuizAttempt


def create_test_quiz(user, topic):
    quiz = Quiz.objects.create(owner=user, topic=topic)

    q1 = Question.objects.create(quiz=quiz, prompt="Q1: Correct MCQ", is_true_false=False)
    c1_correct = Choice.objects.create(question=q1, text='A', is_correct=True)
    Choice.objects.create(question=q1, text='B', is_correct=False)

    q2 = Question.objects.create(quiz=quiz, prompt="Q2: Correct T/F", is_true_false=True)
    c2_correct = Choice.objects.create(question=q2, text='True', is_correct=True)
    Choice.objects.create(question=q2, text='False', is_correct=False)

    q3 = Question.objects.create(quiz=quiz, prompt="Q3: Incorrect MCQ", is_true_false=False)
    Choice.objects.create(question=q3, text='X', is_correct=False)
    c3_correct = Choice.objects.create(question=q3, text='Y', is_correct=True)

    return quiz, {
        'q1_correct_id': c1_correct.id,
        'q2_correct_id': c2_correct.id,
        'q3_incorrect_id': q3.choice_set.filter(is_correct=False).first().id,
        'total_questions': 3
    }


class QuizAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='password')
        self.staff_user = User.objects.create_user(username='staffuser', password='password', is_staff=True)
        self.unauth_client = self.client

        self.auth_client = self.client
        self.auth_client.force_authenticate(user=self.user)

class RegistrationAndAuthTests(QuizAPITests):
    def test_register_view_success(self):
        url = reverse('register')
        data = {'username': 'newuser', 'password': 'securepassword123'}
        response = self.unauth_client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(username='newuser').exists())

    def test_chat_with_ai_requires_auth(self):
        url = reverse('chat_with_ai')
        response = self.unauth_client.post(url, {'message': 'Hi'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

@patch('api.views.get_chat_response')
class ChatViewTests(QuizAPITests):
    def test_chat_with_ai_view_success(self, mock_get_chat_response):
        mock_get_chat_response.return_value = "Hello! I am a test response."
        url = reverse('chat_with_ai')
        data = {'message': 'Hello AI'}
        response = self.auth_client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['reply'], "Hello! I am a test response.")
        mock_get_chat_response.assert_called_once_with('Hello AI')

     def test_chat_with_ai_view_api_error(self, mock_get_chat_response):
            mock_get_chat_response.side_effect = RuntimeError("OpenAI failed")
            url = reverse('chat_with_ai')
            data = {'message': 'Fail me'}
            response = self.auth_client.post(url, data, format='json')

            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
            self.assertIn('OpenAI failed', response.data['error'])

@patch('api.views.generate_quiz')
class GenerateQuizViewTests(QuizAPITests):
    def test_generate_quiz_view_success(self, mock_generate_quiz):
        mock_generate_quiz.return_value = [
            {'prompt': 'What is 2+2?', 'type': 'mcq', 'choices': [
                {'text': '3', 'is_correct': False},
                {'text': '4', 'is_correct': True}
            ]},
            {'prompt': 'Django is a Python framework.', 'type': 'tf', 'correct': True}
        ]

        url = reverse('generate_quiz')
        response = self.auth_client.post(url, {'topic': 'Math'}, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Quiz.objects.count(), 1)
        self.assertEqual(Question.objects.count(), 2)
        self.assertEqual(Choice.objects.count(), 4)
        self.assertEqual(response.data['topic'], 'Math')