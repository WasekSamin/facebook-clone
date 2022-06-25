from django.db import models
from authentication.models import Account
from uuid import uuid4
from ckeditor.fields import RichTextField


class Post(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    content = RichTextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    char_created_at = models.CharField(max_length=200, null=True, blank=True)
    char_updated_at = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.uid)


class Comment(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    content = RichTextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    char_created_at = models.CharField(max_length=200, null=True, blank=True)
    char_updated_at = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.uid)


class Like(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.OneToOneField(Account, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    char_created_at = models.CharField(max_length=200, null=True, blank=True)
    char_updated_at = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return str(self.uid)