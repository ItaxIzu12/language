"""Language-neutral validation for optional, authored word explanations."""
from rest_framework import serializers


class WordPartSerializer(serializers.Serializer):
    target = serializers.CharField(max_length=200)
    reading = serializers.CharField(max_length=200, required=False)
    meaning = serializers.CharField(max_length=500)


class WordExplanationSerializer(serializers.Serializer):
    parts = WordPartSerializer(many=True, min_length=2, max_length=12)
    explanation = serializers.CharField(max_length=4000)
    mnemonic = serializers.CharField(max_length=2000, required=False)
    status = serializers.ChoiceField(choices=["draft", "reviewed"])
    sourceNote = serializers.CharField(max_length=2000)
