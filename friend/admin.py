from django.contrib import admin

# Register your models here.
from .models import Friend


@admin.register(Friend)
class FriendAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", "char_created_at"
    )