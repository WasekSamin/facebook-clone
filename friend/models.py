from django.db import models
from authentication.models import Account
from uuid import uuid4


class Friend(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.OneToOneField(Account, on_delete=models.CASCADE, null=True, related_name="friend_user")
    friends = models.ManyToManyField(Account, blank=True, related_name="friend_all_friends")
    char_created_at = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.uid)
