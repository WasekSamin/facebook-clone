from rest_framework import serializers
from .models import Chat, ChatMessage, ChatMessageSeen, ChatCounter


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"
        depth = 2


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"
        depth = 3


class ChatMessageSeenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessageSeen
        fields = "__all__"
        depth = 3


class ChatCounterSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatCounter
        fields = "__all__"
        depth = 2