from django.db import models
from authentication.models import Account
from post.models import Post
from friend.models import FriendRequest
from uuid import uuid4
from django.utils import timezone


class Notification(models.Model):
    NOTIFICATION_TYPE = (
        ("friend", "friend"),
        ("comment", "comment"),
        ("Like", "Like")
    )
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    # Receiver
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name="notification_user")
    notification_type = models.CharField(max_length=120, null=True, choices=NOTIFICATION_TYPE)
    is_friend_request_accepted = models.BooleanField(default=False, blank=True)
    is_notification_seen = models.BooleanField(default=False)
    # Sender
    notified_sender = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name="notification_notified_sender")
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, blank=True, related_name="notification_post")
    friend_request = models.ForeignKey(FriendRequest, on_delete=models.CASCADE, null=True, blank=True, related_name="notification_friend_request")
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ("-created_at", )

    def __str__(self):
        return str(self.uid)


class NotificationCounter(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.OneToOneField(Account, on_delete=models.CASCADE, null=True, related_name="notification_counter_user")
    notification_counter = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ("-created_at", )

    def __str__(self):
        return str(self.uid)