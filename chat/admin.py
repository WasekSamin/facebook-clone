from django.contrib import admin

from .models import Chat, ChatMessageSeen, ChatCounter, ChatMessage, ChatLastMessage


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user1", "user2",
        "created_at"
    )


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "chat", "sender",
        "message", "created_at"
    )


@admin.register(ChatLastMessage)
class ChatLastMessageAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "chat", "last_message", "created_at", "updated_at"
    )


@admin.register(ChatMessageSeen)
class ChatMessageSeenAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "chat",
        "created_at"
    )


@admin.register(ChatCounter)
class ChatCounterAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user",
        "counter", "created_at"
    )