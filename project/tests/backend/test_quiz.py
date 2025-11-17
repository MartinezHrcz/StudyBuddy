from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest.mock import patch

class QuizTests(APITestCase):

    def setUp(self):
        
        self.client.post(reverse('register'), {
            "username": "tester",
            "email": "t@t.com",
            "password": "pw123456"
        })

        res = self.client.post(reverse('token_obtain_pair'), {
            "username": "tester",
            "password": "pw123456"
        })

        self.access = res.data["access"]
        self.auth = {"HTTP_AUTHORIZATION": f"Bearer {self.access}"}

    @patch("api.openai_client.generate_quiz")
    def test_generate_quiz(self, mock_ai):
        """OpenAI hívást mock-oljuk, nem megy ki a netre."""
        mock_ai.return_value = [
            {
                "question": "2 + 2?",
                "options": ["3", "4", "5"],
                "answer": "4"
            }
        ]

        response = self.client.post(
            reverse('quiz-generate'),
            {"topic": "Math"},
            **self.auth,
            format='json'
        )

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("id", response.data)

    @patch("api.openai_client.generate_quiz")
    def test_solve_quiz(self, mock_ai):
        """Generálunk egy quizt, majd kitöltjük."""
        mock_ai.return_value = [
            {
                "question": "Capital of France?",
                "options": ["Paris", "London", "Berlin"],
                "answer": "Paris"
            }
        ]

        # Lekérjük a quiz ID-t
        create_res = self.client.post(
            reverse("quiz-generate"),
            {"topic": "History"},
            **self.auth,
            format="json"
        )

        quiz_id = create_res.data["id"]

        # Teszt válasz küldése
        submit_res = self.client.post(
            f"/api/quizzes/{quiz_id}/submit/",
            {"answers": {1: 1}},   # 1-es kérdésre 1-es válasz (mockolt)
            **self.auth,
            format="json"
        )

        self.assertEqual(submit_res.status_code, 200)
        self.assertIn("correct", submit_res.data)
        self.assertIn("total", submit_res.data)