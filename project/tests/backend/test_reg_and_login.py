from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest.mock import patch


class AuthTests(APITestCase):
    def test_register(self):
        url = reverse('register')
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpass123"
        }

        response = self.client.post(url, data, format='json')

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('username', response.data)

    def test_login(self):
        
        self.client.post(reverse('register'), {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpass123"
        })

        
        response = self.client.post(reverse('token_obtain_pair'), {
            "username": "testuser",
            "password": "testpass123"
        })

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)
        self.assertIn("refresh", response.data)