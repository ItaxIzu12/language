import unicodedata

from django.core.exceptions import ValidationError


class SpecialCharacterValidator:
    def validate(self, password, user=None):
        if not any(unicodedata.category(char)[0] in ("P", "S") for char in password):
            raise ValidationError(self.get_help_text(), code="password_missing_symbol")

    def get_help_text(self):
        return "Verwende mindestens ein Sonderzeichen, zum Beispiel !, ? oder #."
