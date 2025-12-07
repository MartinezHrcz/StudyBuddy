from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL

class Quiz(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    topic = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Quiz {self.id} - {self.topic}"

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, related_name='questions', on_delete=models.CASCADE)
    prompt = models.TextField()
    is_true_false = models.BooleanField(default=False)

    def __str__(self):
        return self.prompt[:50]

class Choice(models.Model):
    question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
    text = models.CharField(max_length=1000)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        return self.text[:50]

class QuizAttempt(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE)
    started_at = models.DateTimeField(auto_now_add=True)
    finished_at = models.DateTimeField(null=True, blank=True)
    correct = models.IntegerField(default=0)
    total = models.IntegerField(default=0)
    is_retake = models.BooleanField(default=False)

    def __str__(self):
        return f"Attempt {self.id} by {self.user}"
