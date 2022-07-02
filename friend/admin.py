from django.contrib import admin

# Register your models here.
from .models import Friend, FriendRequest


@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", 
        "created_at"
    )


@admin.register(FriendRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user",
        "created_at"
    )