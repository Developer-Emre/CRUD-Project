from datetime import timedelta, timezone
from rest_framework import serializers,viewsets
from rest_framework.response import Response
from .models import Event

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
        