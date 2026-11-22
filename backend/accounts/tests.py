import re
from urllib.parse import parse_qs, urlsplit
from django.contrib.auth import get_user_model
from django.core import mail
from django.test import TestCase, override_settings
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes


@override_settings(EMAIL_BACKEND="django.core.mail.backends.locmem.EmailBackend", PUBLIC_APP_URL="https://learn.example.com")
class RecoveryTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user("learner", "learner@example.com", "Original!Pass482")

    def post(self, path, data):
        return self.client.post("/api/v1/" + path + "/", data, content_type="application/json")

    def test_reset_link_and_one_time_use(self):
        response = self.post("password-reset", {"email": self.user.email})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)
        url = re.search(r"https://\S+", mail.outbox[0].body).group()
        self.assertTrue(url.startswith("https://learn.example.com/#/passwort-zuruecksetzen?"))
        params = parse_qs(urlsplit(url).fragment.split("?", 1)[1])
        payload = {"uid": params["uid"][0], "token": params["token"][0],
                   "password": "Changed!Pass982", "confirmation": "Changed!Pass982"}
        self.assertEqual(self.post("password-reset-confirm", payload).status_code, 200)
        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password(payload["password"]))
        self.assertEqual(self.post("password-reset-confirm", payload).status_code, 400)

    def test_unknown_email_has_same_response(self):
        known = self.post("password-reset", {"email": self.user.email})
        unknown = self.post("password-reset", {"email": "missing@example.com"})
        self.assertEqual(known.json(), unknown.json())
        self.assertEqual(len(mail.outbox), 1)

    def test_invalid_token_and_weak_password(self):
        uid = urlsafe_base64_encode(force_bytes(self.user.pk))
        response = self.post("password-reset-confirm", {"uid": uid, "token": "invalid",
            "password": "Changed!Pass982", "confirmation": "Changed!Pass982"})
        self.assertEqual(response.status_code, 400)
        token = default_token_generator.make_token(self.user)
        self.assertEqual(self.post("password-reset-confirm", {"uid":uid, "token":token,
            "password":"12345678", "confirmation":"12345678"}).status_code, 400)
        self.assertEqual(self.post("password-reset-confirm", {"uid":uid, "token":token,
            "password":{}, "confirmation":{}}).status_code, 400)
        with override_settings(PASSWORD_RESET_TIMEOUT=-1):
            self.assertEqual(self.post("password-reset-confirm", {"uid":uid, "token":token,
                "password":"Changed!Pass982", "confirmation":"Changed!Pass982"}).status_code, 400)

    def test_old_account_can_set_recovery_email_with_password(self):
        self.assertEqual(self.post("recovery-email", {"email":"new@example.com","password":"Original!Pass482"}).status_code, 401)
        self.client.force_login(self.user)
        self.assertEqual(self.post("recovery-email", {"email":"new@example.com","password":"wrong"}).status_code, 403)
        self.assertEqual(self.post("recovery-email", {"email":"new@example.com","password":"Original!Pass482"}).status_code, 200)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, "new@example.com")

    def test_registration_stores_email(self):
        response = self.post("register", {"username":"newlearner","email":"new@example.com","password":"Unique!Learning913"})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(get_user_model().objects.get(username="newlearner").email, "new@example.com")
