from datetime import date
import re

POS = set("noun verb adjective adverb pronoun number measure conjunction preposition particle phrase interjection".split())


def require(condition):
    if not condition:
        raise ValueError("Ungültiges Format des Lernstands.")


def obj(value, fields):
    require(isinstance(value, dict) and fields <= value.keys())
    return value


def count(value):
    require(type(value) is int and 0 <= value <= 2**53 - 1)


def string(value):
    require(isinstance(value, str) and 0 < len(value) <= 4096 and "\x00" not in value)


def day(value):
    require(isinstance(value, str) and re.fullmatch(r"\d{4}-\d{2}-\d{2}", value))
    date.fromisoformat(value)


def validate_document(data, language):
    obj(data, {"settings", "progress", "customWords"})
    s = obj(data["settings"], {"theme", "lang", "rate", "dailyGoal", "showReading"})
    require(s["lang"] == language and s["theme"] in ("light", "dark"))
    require(type(s["dailyGoal"]) is int and 1 <= s["dailyGoal"] <= 10000)
    require(type(s["rate"]) in (float, int) and 0.5 <= s["rate"] <= 1.2 and type(s["showReading"]) is bool)
    if "dailyMinutes" in s:
        require(type(s["dailyMinutes"]) is int and s["dailyMinutes"] in (5, 10, 20))
    p = obj(data["progress"], {"xp", "lessonsDone", "days", "done", "torn", "activity", "cards"})
    count(p["xp"])
    count(p["lessonsDone"])
    for field in ("days", "done", "torn", "activity", "cards"):
        require(isinstance(p[field], dict))
        for key, value in p[field].items():
            string(key)
            if field in ("days", "torn", "activity"):
                day(key)
            if field == "days":
                count(value)
            elif field in ("done", "torn"):
                require(type(value) is bool)
            elif field == "activity":
                for k in ("review", "apply", "lesson"):
                    count(obj(value, {k})[k])
            else:
                obj(value, {"due", "box", "right", "wrong"})
                day(value["due"])
                count(value["box"])
                require(value["box"] <= 6)
                count(value["right"])
                count(value["wrong"])
    words = data["customWords"]
    require(isinstance(words, list))
    ids = set()
    for w in words:
        obj(w, {"id", "target", "reading", "de", "category", "pos", "level"})
        for k in ("id", "target", "reading", "de", "pos", "level"):
            string(w[k])
        require(w["id"] not in ids and w["category"] == "custom" and w["pos"] in POS and w["level"] in ("A1", "A2", "B1", "B2"))
        ids.add(w["id"])
        if "example" in w:
            for k in ("target", "reading", "de"):
                string(obj(w["example"], {k})[k])
        if "note" in w:
            string(w["note"])
        if "learned" in w:
            require(type(w["learned"]) is bool)
