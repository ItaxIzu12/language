from django.http import JsonResponse
from django.views.decorators.http import require_GET

from .models import Course


@require_GET
def courses(request):
    return JsonResponse({"results": list(Course.objects.order_by("code").values("code", "name"))})


@require_GET
def course(request, language):
    row = Course.objects.filter(pk=language).first()
    if row is None:
        return JsonResponse({"error": "Unbekannter Kurs."}, status=404)
    return JsonResponse(row.content)


@require_GET
def words(request, language):
    row = Course.objects.filter(pk=language).first()
    if row is None:
        return JsonResponse({"error": "Unbekannter Kurs."}, status=404)
    items = row.words.all()
    for field in ("level", "category"):
        if value := request.GET.get(field):
            items = items.filter(**{field: value})
    try:
        offset = int(request.GET.get("offset", 0))
        limit = int(request.GET.get("limit", 50))
        if not 0 <= offset <= 2**31 or not 1 <= limit <= 200:
            raise ValueError
    except ValueError:
        return JsonResponse({"error": "Ungültiger Seitenbereich."}, status=400)
    return JsonResponse({"count": items.count(), "results": list(items.values_list("content", flat=True)[offset:offset + limit])})
