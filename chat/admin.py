from django.contrib import admin

from .models import Chat, ChatMessageSeen, ChatCounter


@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user1", "user2",
        "created_at"
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