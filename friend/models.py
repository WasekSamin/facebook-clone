from django.db import models
from authentication.models import Account
from uuid import uuid4
from django.utils import timezone


class Friend(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.OneToOneField(
        Account, on_delete=models.CASCADE, null=True, related_name="friend_user")
    friends = models.ManyToManyField(
        Account, blank=True, related_name="friend_all_friends")
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ("-created_at", )

    def __str__(self):
        return str(self.uid)

    # Get friend object using user object
    def get_friend_obj(self, account_obj):
        try:
            friend_obj = Friend.objects.get(user=account_obj)
        except Friend.DoesNotExist:
            return None
        else:
            return friend_obj

    # Get friend object using user uid
    def get_friend_obj_using_user_uid(self, user_uid):
        try:
            friend_obj = Friend.objects.get(user__uid=user_uid)
        except Friend.DoesNotExist:
            return None
        else:
            return friend_obj

# For receiver friend requests


class FriendRequest(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user = models.OneToOneField(
        Account, on_delete=models.CASCADE, null=True, related_name="friend_request_user")
    friend_request_senders = models.ManyToManyField(
        Account, blank=True, related_name="friend_requet_senders")
    created_at = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ("-created_at", )

    def __str__(self):
        return str(self.uid)

    # Check if the user in the friend request list
    def check_if_user_in_friend_request_list(self, account_obj, uid):
        try:
            friend_request_obj = FriendRequest.objects.get(user__uid=uid)
        except FriendRequest.DoesNotExist:
            is_user_in_friend_request_list = False
        else:
            is_user_in_friend_request_list = account_obj in friend_request_obj.friend_request_senders.all()

        return is_user_in_friend_request_list

    # Get friend request object
    def get_friend_request_obj(self, account_obj):
        try:
            friend_request_obj = FriendRequest.objects.get(user=account_obj)
        except FriendRequest.DoesNotExist:
            return None
        else:
            return friend_request_obj
