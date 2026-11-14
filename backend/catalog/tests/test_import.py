from copy import deepcopy
from io import StringIO
import json
from pathlib import Path
from tempfile import TemporaryDirectory

from django.core.management import call_command, CommandError
from django.test import SimpleTestCase, TestCase

from catalog.models import Word
from catalog.views import WordQuery


class QueryTests(SimpleTestCase):
    def test_page_bounds(self):
        for limit in (0, 201, "two"):
            self.assertFalse(WordQuery(data={"limit": limit}).is_valid())


class ImportTests(TestCase):
    def import_package(self, package):
        with TemporaryDirectory() as directory:
            path = Path(directory) / "pack.json"
            path.write_text(json.dumps([package]))
            call_command("import_courses", path, stdout=StringIO())

    def test_update_retire_and_rollback(self):
        a = {"id": "zh:茶:chá:n", "target": "茶", "reading": "chá", "de": "Tee", "category": "food", "level": "A1"}
        b = {**a, "id": "zh:水:shuǐ:n", "target": "水", "de": "Wasser"}
        pack = {"code": "zh", "name": "Mandarin", "categories": [{"id": "food"}], "vocab": [a, b]}
        self.import_package(pack)
        original = Word.objects.get(key=a["id"]).pk
        pack["vocab"] = [{**a, "de": "Teegetränk"}]
        self.import_package(pack)
        self.assertEqual(Word.objects.get(key=a["id"]).pk, original)
        self.assertFalse(Word.objects.get(key=b["id"]).active)
        invalid = deepcopy(pack)
        invalid["vocab"] *= 2
        with self.assertRaises(CommandError):
            self.import_package(invalid)
        data = self.client.get("/api/v1/courses/zh/words/", {"q": "getränk"}).json()
        self.assertEqual(data["results"], pack["vocab"])
