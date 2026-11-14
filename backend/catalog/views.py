from django.db.models import Q
from rest_framework import serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.generics import get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .models import Course


class WordQuery(serializers.Serializer):
    offset = serializers.IntegerField(default=0, min_value=0, max_value=2**31)
    limit = serializers.IntegerField(default=50, min_value=1, max_value=200)
    category = serializers.CharField(required=False, max_length=100)
    level = serializers.CharField(required=False, max_length=16)
    q = serializers.CharField(required=False, max_length=120)


@api_view(["GET"])
@permission_classes([AllowAny])
def courses(request):
    return Response({"results": list(Course.objects.order_by("code").values("code", "name"))})


@api_view(["GET"])
@permission_classes([AllowAny])
def course(request, language):
    return Response(get_object_or_404(Course, pk=language).content)


@api_view(["GET"])
@permission_classes([AllowAny])
def words(request, language):
    row = get_object_or_404(Course, pk=language)
    params = WordQuery(data=request.query_params)
    params.is_valid(raise_exception=True)
    options = params.validated_data
    items = row.words.filter(active=True, **{k: options[k] for k in ("category", "level") if k in options})
    if term := options.get("q"):
        items = items.filter(Q(content__target__icontains=term) | Q(content__reading__icontains=term) | Q(content__de__icontains=term))
    offset = options["offset"]
    page = items.values_list("content", flat=True)[offset:offset + options["limit"]]
    return Response({"count": items.count(), "results": list(page)})
