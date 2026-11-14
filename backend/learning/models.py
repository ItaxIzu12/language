from django.conf import settings
from django.db import models


class LearningState(models.Model):
    """One versioned offline-compatible learner document per account and language."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    language = models.SlugField(max_length=32)
    revision = models.PositiveBigIntegerField(default=0)
    document = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["user", "language"], name="unique_learner_language")]


class Course(models.Model):
    code = models.SlugField(primary_key=True, max_length=32)
    name = models.CharField(max_length=120)
    content = models.JSONField()


class Word(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="words")
    key = models.TextField()
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=2)
    position = models.PositiveIntegerField()
    content = models.JSONField()

    class Meta:
        ordering = ["position"]
        constraints = [models.UniqueConstraint(fields=["course", "key"], name="unique_course_word")]
        indexes = [models.Index(fields=["course", "category", "level"])]
