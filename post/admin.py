from django.contrib import admin

from .models import Post, Comment, Like


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user",
        "content", "char_created_at"
    )


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", "post",
        "content", "char_created_at"
    )


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = (
        "uid", "user", "post",
        "like", "dislike",
        "char_created_at"
    )
