from django.conf import settings
from django.db import models


class LearningState(models.Model):
    """One versioned offline-compatible learner document per account and language."""
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    language = models.ForeignKey("catalog.Course", db_column="language", on_delete=models.PROTECT)
    revision = models.PositiveBigIntegerField(default=0)
    document = models.JSONField(default=dict)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [models.UniqueConstraint(fields=["user", "language"], name="unique_learner_language")]
