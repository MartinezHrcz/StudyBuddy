import pytest
from rest_framework.test import APIClient
from rest_framework.reverse import reverse

@pytest.mark.django_db
def test_register_user():
    client = APIClient()
    url = reverse("register")  # Replace with your actual endpoint name
    data = {
        "username": "testuser",
        "password": "testpassword",
        "email": "testuser@example.com",
    }

    response = client.post(url, data)

    assert response.status_code == 201
    assert "token" in response.data

@pytest.mark.django_db
def test_login_user():
    client = APIClient()
    register_url = reverse("register")
    login_url = reverse("login")  # Replace with your actual endpoint name

    # Register a user first
    register_data = {
        "username": "testuser",
        "password": "testpassword",
        "email": "testuser@example.com",
    }
    client.post(register_url, register_data)

    # Attempt to log in
    login_data = {
        "username": "testuser",
        "password": "testpassword",
    }
    response = client.post(login_url, login_data)

    assert response.status_code == 200
    assert "token" in response.data

@pytest.mark.django_db
def test_invalid_login():
    client = APIClient()
    url = reverse("login")  # Replace with your actual endpoint name
    data = {
        "username": "nonexistentuser",
        "password": "wrongpassword",
    }

    response = client.post(url, data)

    assert response.status_code == 401
    assert "non_field_errors" in response.data