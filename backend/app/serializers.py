from rest_framework import serializers
from app.models import eventRecord


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = eventRecord
        fields = ('id', 'Name', 'Location', 'Date')