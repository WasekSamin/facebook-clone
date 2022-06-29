from rest_framework import serializers
from .models import Notification, NotificationCounter


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
        depth = 2


class NotificationCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotificationCounter
        fields = "__all__"
        depth = 2