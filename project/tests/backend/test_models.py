import pytest
from django.contrib.auth import get_user_model
from api.models import YourModelName  # Replace with actual model names

@pytest.mark.django_db
def test_model_creation():
    # Example test for model creation
    user = get_user_model().objects.create_user(username="testuser", password="testpassword")
    model_instance = YourModelName.objects.create(field1="value1", field2=user)

    assert model_instance.field1 == "value1"
    assert model_instance.field2 == user

@pytest.mark.django_db
def test_model_str_representation():
    # Example test for __str__ method
    model_instance = YourModelName.objects.create(field1="value1")

    assert str(model_instance) == "value1"  # Replace with expected string representation

@pytest.mark.django_db
def test_model_field_defaults():
    # Example test for default field values
    model_instance = YourModelName.objects.create()

    assert model_instance.some_field == "default_value"  # Replace with actual default value