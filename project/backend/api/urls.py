from django.urls import path
from . import views
from .views import chat_with_ai_view

urlpatterns = [
    path('quizzes/generate/', views.generate_quiz_view, name='generate_quiz'),
    path('quizzes/<int:quiz_id>/', views.quiz_detail, name='quiz_detail'),
    path('quizzes/<int:quiz_id>/submit/', views.submit_quiz, name='submit_quiz'),
    path('profile/', views.profile_stats, name='profile_stats'),
    path('profile/attempts/', views.user_quiz_attempts),
    path('leaderboard/', views.leaderboard_view, name='leaderboard'),
    path('leaderboard/me/', views.leaderboard_my_rank, name='leaderboard_my_rank'),
    path('register/', views.register_view, name='register'),
    path('chat/', chat_with_ai_view, name='chat_with_ai'),
]