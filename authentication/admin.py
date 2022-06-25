from django.contrib import admin

# Register your models here.
from .models import Account, UpdatePassword, UserProfilePic


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "email", "username", "current_profile_pic",
        "is_active", "gender", "char_created_at",
        "char_updated_at"
    )


@admin.register(UpdatePassword)
class UpdatePasswordAdmin(admin.ModelAdmin):
    list_display = (
        "id", "user", "token", 
        "char_created_at", "char_updated_at"
    )


@admin.register(UserProfilePic)
class UserProfilePicAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "image", "char_created_at",
    )