from django.contrib import admin

from .models import Post, Comment, Like


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", "content", 
        "created_at", "updated_at"
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", "post", "content", 
        "created_at", "updated_at"
    )


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", "post",
        "like", "dislike",
        "created_at", "updated_at"
    )
