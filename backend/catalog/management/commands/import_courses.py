import json
import re
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction

from catalog.models import Course, Word
from catalog.explanations import WordExplanationSerializer


class Command(BaseCommand):
    help = "Importiert vollständige Sprachpakete atomar anhand stabiler Wortschlüssel."

    def add_arguments(self, parser):
        parser.add_argument("file", type=Path)

    @transaction.atomic
    def handle(self, file, **options):
        packages = json.loads(file.read_text(encoding="utf-8"))
        seen = set()
        for content in packages:
            code = content["code"]
            if not re.fullmatch(r"[a-zA-Z0-9-]{1,32}", code) or code in seen:
                raise CommandError("Ungültiger oder doppelter Sprachcode.")
            seen.add(code)
            vocab = content.pop("vocab")
            categories = {c["id"] for c in content["categories"]}
            course, _ = Course.objects.update_or_create(code=code, defaults={"name": content["name"], "content": content})
            rows = []
            keys = set()
            for position, word in enumerate(vocab):
                key = word["id"]
                if key in keys or not key.startswith(code + ":") or word["category"] not in categories:
                    raise CommandError(f"{code}: ungültige Kategorie oder Wort-ID {key}")
                if "understanding" in word:
                    explanation = WordExplanationSerializer(data=word["understanding"])
                    if not explanation.is_valid():
                        raise CommandError(f"{code}: ungültige Worterklärung für {key}: {explanation.errors}")
                    word["understanding"] = explanation.validated_data
                keys.add(key)
                rows.append(Word(course=course, key=key, category=word["category"], level=word["level"],
                                 position=position, content=word, active=True))
            if not rows:
                raise CommandError(f"{code}: leeres Paket")
            course.words.filter(active=True).update(active=False)
            Word.objects.bulk_create(rows, batch_size=250, update_conflicts=True, unique_fields=["course", "key"],
                                     update_fields=["category", "level", "position", "content", "active"])
            self.stdout.write(f"{course.name}: {len(rows)} Wörter")
