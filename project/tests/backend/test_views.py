import pytest
from rest_framework.test import APIClient
from rest_framework.reverse import reverse
from api.models import YourModelName  # Replace with actual model names

@pytest.mark.django_db
def test_view_get_list():
    # Example test for GET request to list view
    client = APIClient()
    url = reverse("your-list-view-name")  # Replace with actual view name

    response = client.get(url)

    assert response.status_code == 200
    assert isinstance(response.json(), list)

@pytest.mark.django_db
def test_view_post_create():
    # Example test for POST request to create view
    client = APIClient()
    url = reverse("your-create-view-name")  # Replace with actual view name
    data = {
        "field1": "value1",
        "field2": "value2",
    }

    response = client.post(url, data)

    assert response.status_code == 201
    assert response.json()["field1"] == "value1"

@pytest.mark.django_db
def test_view_get_detail():
    # Example test for GET request to detail view
    instance = YourModelName.objects.create(field1="value1", field2="value2")
    client = APIClient()
    url = reverse("your-detail-view-name", args=[instance.id])  # Replace with actual view name

    response = client.get(url)

    assert response.status_code == 200
    assert response.json()["field1"] == "value1"