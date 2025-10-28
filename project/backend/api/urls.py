from django.urls import path
from . import views

urlpatterns = [
    path('quizzes/generate/', views.generate_quiz_view),
    path('quizzes/<int:quiz_id>/', views.quiz_detail),
    path('quizzes/<int:quiz_id>/submit/', views.submit_quiz),
    path('profile/', views.profile_stats),
    path('register/', views.register_view),  # register endpoint
]