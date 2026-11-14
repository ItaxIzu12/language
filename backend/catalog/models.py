from django.db import models


class Course(models.Model):
    code = models.SlugField(primary_key=True, max_length=32)
    name = models.CharField(max_length=120)
    content = models.JSONField()


    class Meta:
        db_table = "learning_course"


class Word(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="words")
    key = models.TextField()
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=2)
    active = models.BooleanField(default=True)
    position = models.PositiveIntegerField()
    content = models.JSONField()

    class Meta:
        db_table = "learning_word"
        ordering = ["position"]
        constraints = [models.UniqueConstraint(fields=["course", "key"], name="unique_course_word")]
        indexes = [models.Index(fields=["course", "category", "level"], name="learning_wo_course__399ff7_idx")]
