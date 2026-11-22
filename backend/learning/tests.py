from copy import deepcopy
from django.contrib.auth import get_user_model
from django.test import Client, TestCase
from catalog.models import Course, Word

STATE = {
    "settings": {"lang": "zh", "rate": 0.9, "showReading": True, "theme": "light", "dailyGoal": 50},
    "customWords": [],
    "progress": {"days": {}, "done": {}, "torn": {}, "activity": {}, "cards": {}, "lessonsDone": 0, "xp": 10},
}


class LearningApiTests(TestCase):
    url = "/api/v1/state/zh/"

    def setUp(self):
        Course.objects.create(code="zh", name="Chinesisch", content={"texts": []})
        self.user = get_user_model().objects.create_user("learner")
        self.client.force_login(self.user)

    def put(self, rev=0, doc=STATE):
        return self.client.put(self.url, {"revision": rev, "document": doc}, content_type="application/json", HTTP_X_LEARNER="learner")

    def test_save_restore_retry_and_conflict(self):
        self.assertEqual(self.put().json(), {"revision": 1})
        self.assertEqual(self.put().json(), {"revision": 1})
        changed = deepcopy(STATE)
        changed["progress"]["xp"] = 20
        self.assertEqual(self.put(0, changed).status_code, 409)
        self.assertEqual(self.put(1, changed).status_code, 200)
        result = self.client.get(self.url, HTTP_X_LEARNER="learner").json()
        self.assertEqual(result, {"revision": 2, "document": changed})

    def test_invalid_card(self):
        changed = deepcopy(STATE)
        changed["progress"]["cards"] = {"a": {"due": "2026-02-31", "box": 1, "right": 2, "wrong": 1}}
        self.assertEqual(self.put(doc=changed).status_code, 400)

    def test_account_isolation(self):
        self.put()
        self.client.force_login(get_user_model().objects.create_user("second"))
        self.assertEqual(self.put().status_code, 409)
        self.assertIsNone(self.client.get(self.url, HTTP_X_LEARNER="second").json()["document"])
        self.client.logout()
        self.assertEqual(self.client.get(self.url).status_code, 401)

    def test_session_lifecycle_and_csrf(self):
        c = Client(enforce_csrf_checks=True)
        credentials = {"username": "mandarin", "password": "testing-languages-184"}
        def post(action):
            return c.post(f"/api/v1/{action}/", credentials, content_type="application/json",
                          HTTP_X_CSRFTOKEN=c.cookies["csrftoken"].value)
        self.assertEqual(c.post("/api/v1/register/", credentials).status_code, 403)
        self.assertIsNone(c.get("/api/v1/session/").json()["username"])
        self.assertEqual(post("register").json()["username"], "mandarin")
        self.assertIsNone(post("logout").json()["username"])
        self.assertEqual(post("login").json()["username"], "mandarin")

    def test_catalog_pagination(self):
        course = Course.objects.get(pk="zh")
        Word.objects.create(course=course, key="test", position=0, category="food", level="A1", content={"de": "Tee"})
        base = "/api/v1/courses/zh/words/"
        self.assertEqual(self.client.get(base, {"level": "A1"}).json()["results"], [{"de": "Tee"}])
        self.assertEqual(self.client.get(base, {"offset": 1}).json()["results"], [])
        self.assertEqual(self.client.get(base, {"limit": -1}).status_code, 400)

    def test_two_languages_export_and_delete(self):
        Course.objects.create(code="ja", name="Japanisch", content={})
        self.put()
        headers = {"HTTP_X_LEARNER": "learner"}
        path = "/api/v1/state/ja/"
        self.assertIsNone(self.client.get(path, **headers).json()["document"])
        payload = {"revision": 0, "document": deepcopy(STATE)}
        self.assertEqual(self.client.put(path, payload, content_type="application/json", **headers).status_code, 400)
        payload["document"]["settings"]["lang"] = "ja"
        self.assertEqual(self.client.put(path, payload, content_type="application/json", **headers).status_code, 200)
        profile = self.client.get("/api/v1/me/").json()
        self.assertEqual({s["language_id"] for s in profile["states"]}, {"ja", "zh"})
        self.assertEqual(self.client.delete("/api/v1/me/", {"password": "wrong"}, content_type="application/json").status_code, 403)
        self.user.set_password("confirm-test-185")
        self.user.save()
        self.client.force_login(self.user)
        self.assertEqual(self.client.delete("/api/v1/me/", {"password": "confirm-test-185"}, content_type="application/json").status_code, 200)
        self.assertFalse(get_user_model().objects.filter(pk=self.user.pk).exists())

    def test_redesigned_workspace_preserves_existing_learning_document(self):
        """Navigation and deep links must not rename persisted learning identifiers."""
        document = deepcopy(STATE)
        document["settings"]["dailyMinutes"] = 20
        document["progress"].update({
            "cards": {"zh:你好:nǐ hǎo:phr": {"box": 2, "due": "2026-11-23", "right": 3, "wrong": 1}},
            "done": {"scenario:zh:bestellen": True, "reading-1": True},
            "days": {"2026-11-22": 120},
            "activity": {"2026-11-22": {"lesson": 1, "review": 5, "apply": 1}},
            "torn": {"2026-11-22": True},
            "lessonsDone": 2,
        })
        self.assertEqual(self.put(doc=document).status_code, 200)
        restored = self.client.get(self.url, HTTP_X_LEARNER="learner").json()
        self.assertEqual(restored["document"], document)
        # Preferences can change without losing any historical progress.
        document["settings"]["theme"] = "dark"
        self.assertEqual(self.put(1, document).status_code, 200)
        self.assertEqual(self.client.get(self.url, HTTP_X_LEARNER="learner").json()["document"], document)
