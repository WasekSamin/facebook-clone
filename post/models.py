from django.db import models
from authentication.models import Account
from uuid import uuid4
from ckeditor.fields import RichTextField
from django.utils import timezone


class Post(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    content = RichTextField(null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    class Meta:
        ordering = ("-created_at", )

    def __str__(self):
        return str(self.uid)


class Comment(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    content = RichTextField(null=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    class Meta:
        ordering = ("-created_at", )

    def __str__(self):
        return str(self.uid)


class Like(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.OneToOneField(Account, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True)
    like = models.BooleanField(default=False)
    dislike = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now, null=True, blank=True)

    class Meta:
        ordering = ("-created_at", )

    def __str__(self):
        return str(self.uid)