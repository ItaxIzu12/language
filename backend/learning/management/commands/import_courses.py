import json
from pathlib import Path

from django.core.management.base import BaseCommand
from django.db import transaction

from learning.models import Course, Word


class Command(BaseCommand):
    help = "Importiert den gemeinsamen Kurskatalog atomar und wiederholbar."

    def add_arguments(self, parser):
        parser.add_argument("file", type=Path)

    @transaction.atomic
    def handle(self, file, **options):
        for content in json.loads(file.read_text(encoding="utf-8")):
            vocab = content.pop("vocab")
            course, _ = Course.objects.update_or_create(
                code=content["code"], defaults={"name": content["name"], "content": content}
            )
            course.words.all().delete()
            Word.objects.bulk_create([
                Word(course=course, key=w["id"], category=w["category"], level=w["level"],
                     position=i, content=w) for i, w in enumerate(vocab)
            ], batch_size=250)
            self.stdout.write(f"{course.name}: {len(vocab)} Wörter")
