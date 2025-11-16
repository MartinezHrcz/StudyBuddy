import pytest
from rest_framework.test import APIClient
from rest_framework.reverse import reverse
from api.models import YourModelName  # Replace with actual model names

@pytest.mark.django_db
def test_get_items():
    client = APIClient()
    url = reverse("item-list")  # Replace with your actual endpoint name

    response = client.get(url)

    assert response.status_code == 200
    assert isinstance(response.data, list)

@pytest.mark.django_db
def test_create_item():
    client = APIClient()
    url = reverse("item-list")  # Replace with your actual endpoint name
    data = {
        "field1": "value1",
        "field2": "value2",
    }

    response = client.post(url, data)

    assert response.status_code == 201
    assert response.data["field1"] == "value1"

@pytest.mark.django_db
def test_update_item():
    instance = YourModelName.objects.create(field1="value1", field2="value2")
    client = APIClient()
    url = reverse("item-detail", args=[instance.id])  # Replace with your actual endpoint name
    data = {
        "field1": "updated_value",
    }

    response = client.put(url, data)

    assert response.status_code == 200
    assert response.data["field1"] == "updated_value"

@pytest.mark.django_db
def test_delete_item():
    instance = YourModelName.objects.create(field1="value1", field2="value2")
    client = APIClient()
    url = reverse("item-detail", args=[instance.id])  # Replace with your actual endpoint name

    response = client.delete(url)

    assert response.status_code == 204
    assert not YourModelName.objects.filter(id=instance.id).exists()