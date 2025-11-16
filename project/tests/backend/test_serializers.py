import pytest
from api.serializers import YourSerializerName  # Replace with actual serializer names
from api.models import YourModelName  # Replace with actual model names

@pytest.mark.django_db
def test_serializer_valid_data():
    # Example test for valid serializer data
    data = {
        "field1": "value1",
        "field2": "value2",
    }
    serializer = YourSerializerName(data=data)

    assert serializer.is_valid() is True
    assert serializer.validated_data["field1"] == "value1"

@pytest.mark.django_db
def test_serializer_invalid_data():
    # Example test for invalid serializer data
    data = {
        "field1": "",  # Invalid value
        "field2": "value2",
    }
    serializer = YourSerializerName(data=data)

    assert serializer.is_valid() is False
    assert "field1" in serializer.errors

@pytest.mark.django_db
def test_serializer_save():
    # Example test for saving data through serializer
    data = {
        "field1": "value1",
        "field2": "value2",
    }
    serializer = YourSerializerName(data=data)
    assert serializer.is_valid() is True

    instance = serializer.save()
    assert instance.field1 == "value1"
    assert instance.field2 == "value2"