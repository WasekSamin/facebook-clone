from django.contrib import admin

from .models import Notification, NotificationCounter

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", "notification_type", "is_friend_request_accepted",
        "is_notification_seen", "notified_sender",
        "post", "friend_request", "created_at"
    )


@admin.register(NotificationCounter)
class NotificationCounterAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", 
        "notification_counter", "created_at"
    )