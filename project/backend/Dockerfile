FROM python:3.11-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
COPY requirements.txt /app/
RUN pip install --upgrade pip && pip install -r requirements.txt && pip install django-cors-headers
COPY . /app/
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
