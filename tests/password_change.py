import os
import sys
import django
from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status

# Add project/backend to path so we can import settings
sys.path.append(os.path.join(os.path.dirname(__file__), '../project/backend'))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'studybuddy.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

class PasswordChangeTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username='testuser', password='old_password')
        self.client.force_authenticate(user=self.user)
        self.url = '/api/auth/password_change/'

    def test_password_change_success(self):
        """Test that a user can successfully change their password."""
        data = {
            'old_password': 'old_password',
            'new_password': 'new_password123'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # Verify password changed
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('new_password123'))

    def test_password_change_wrong_old_password(self):
        """Test that providing the wrong old password fails."""
        data = {
            'old_password': 'wrong_password',
            'new_password': 'new_password123'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        
        # Verify password NOT changed
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password('old_password'))

    def test_password_change_missing_fields(self):
        """Test that missing fields cause a 400 error."""
        data = {
            'new_password': 'new_password123'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

if __name__ == '__main__':
    import unittest
    unittest.main()
