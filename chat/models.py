from django.db import models
from authentication.models import Account
from uuid import uuid4
from django.utils import timezone


class Chat(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    user1 = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name="chat_user1")
    user2 = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name="chat_user2")
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.uid)

    # Get chat object from user uid and profile uid
    def get_chat_obj_from_user_and_profile_uid(self, user_uid, profile_uid):
        try:
            chat_obj = Chat.objects.get(user1__uid=user_uid, user2__uid=profile_uid)
        except Chat.DoesNotExist:
            try:
                chat_obj = Chat.objects.get(user1__uid=profile_uid, user2__uid=user_uid)
            except Chat.DoesNotExist:
                return None
            else:
                return chat_obj
        else:
            return chat_obj



class ChatMessageSeen(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False,default=uuid4)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, null=True, related_name="chat_message_seen_chat")
    chat_seen_users = models.ManyToManyField(Account, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.uid)


class ChatCounter(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False,default=uuid4)
    user = models.ForeignKey(Account, on_delete=models.CASCADE, null=True, related_name="chat_counter_user")
    counter = models.BigIntegerField(default=0, null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return str(self.uid)