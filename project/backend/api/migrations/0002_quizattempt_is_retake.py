# Generated migration for adding is_retake field to QuizAttempt

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='quizattempt',
            name='is_retake',
            field=models.BooleanField(default=False),
        ),
    ]
