import json
from django.http import JsonResponse


def error(message, status):
    return JsonResponse({"error": message}, status=status)


def body(request):
    if request.content_type != "application/json":
        raise ValueError
    value = json.loads(request.body)
    if not isinstance(value, dict):
        raise ValueError
    return value
