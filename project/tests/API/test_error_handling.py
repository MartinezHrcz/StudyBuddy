import pytest
from rest_framework.test import APIClient
from rest_framework.reverse import reverse

@pytest.mark.django_db
def test_404_not_found():
    client = APIClient()
    url = reverse("nonexistent-endpoint")  # Replace with an endpoint that doesn't exist

    response = client.get(url)

    assert response.status_code == 404
    assert "detail" in response.data
    assert response.data["detail"] == "Not found."

@pytest.mark.django_db
def test_400_bad_request():
    client = APIClient()
    url = reverse("item-list")  # Replace with your actual endpoint name
    data = {
        "invalid_field": "value",  # Sending invalid data
    }

    response = client.post(url, data)

    assert response.status_code == 400
    assert "invalid_field" in response.data

@pytest.mark.django_db
def test_500_internal_server_error():
    client = APIClient()
    url = reverse("item-detail", args=[9999])  # Replace with an endpoint that triggers a server error

    response = client.get(url)

    assert response.status_code == 500  # Adjust based on your error handling
    assert "detail" in response.data
    assert "server error" in response.data["detail"].lower()