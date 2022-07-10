from .models import Chat, ChatMessage, ChatMessageSeen, ChatCounter, ChatLastMessage
from authentication.models import Account
from friend.models import Friend
from .serializers import ChatSerializer, ChatMessageSerializer, ChatMessageSeenSerializer, ChatCounterSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from facebook_core.custom_pagination import CustomPagination
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.db.models import Q
from django.utils import timezone


class FetchUserChatObjView(View):
    def get(self, rqeuest, user_uid, profile_uid):
        json_resp = {
            "error": True
        }

        chat_obj = Chat.get_chat_obj_from_user_and_profile_uid(
            self, user_uid, profile_uid)

        # If chat object not found or None, create a new chat object
        if chat_obj is None:
            try:
                user1 = Account.objects.get(uid=user_uid)
                user2 = Account.objects.get(uid=profile_uid)
            except Account.DoesNotExist:
                json_resp = {
                    "error": True,
                    "user_not_found": True
                }
                return JsonResponse(json_resp, safe=False)
            else:
                chat_obj = Chat(
                    user1=user1,
                    user2=user2
                )
                chat_obj.save()

        json_resp = {
            "error": False,
            "chat_found": True,
            "chat_uid": chat_obj.uid
        }
        return JsonResponse(json_resp, safe=False)


class ChatList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Chat.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = ChatSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatDetail(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Chat.objects.get(uid=uid)
        except:
            return None

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)

        if snippet is None:
            resp_msg = {
                "error": True,
                "invalid_chat_uid": True
            }
            return Response(resp_msg)

        serializer = ChatSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)

        if snippet is None:
            resp_msg = {
                "error": True
            }
            return Response(resp_msg)

        serializer = ChatSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        if snippet is None:
            resp_msg = {
                "error": True
            }
            return Response(resp_msg)

        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FetchChatroomMessagesView(View):
    def get(self, request, chat_uid, number_of_request):
        json_resp = {
            "error": True
        }

        chat_obj = Chat.get_chat_obj_using_uid(self, chat_uid)

        if chat_obj is None:
            json_resp = {
                "error": True,
                "invalid_chat_uid": True
            }
            return JsonResponse(json_resp, safe=False)

        upper = number_of_request
        lower = number_of_request - 30

        chat_messages = ChatMessage.objects.filter(
            chat=chat_obj).order_by("-created_at")[lower:upper]
        chat_message_list = list(map(lambda cm: {
            "uid": cm.uid,
            "sender": {
                "uid": cm.sender.uid,
                "username": cm.sender.username,
                "current_profile_pic": cm.sender.current_profile_pic.url if cm.sender.current_profile_pic else None,
                "email": cm.sender.email
            },
            "message": cm.message,
            "created_at": cm.created_at
        }, chat_messages))

        json_resp = {
            "error": False,
            "chat_message_found": True,
            "messages": chat_message_list
        }
        return JsonResponse(json_resp, safe=False)


# Fetch all the friends with their last chat message
class FetchFriendsWithLastMessagesView(View):
    def get(self, request, user_uid, number_of_request):
        json_resp = {
            "error": True
        }

        friend_obj = Friend.get_friend_obj_using_user_uid(self, user_uid)

        if friend_obj is None:
            json_resp = {
                "error": True,
                "friend_obj_not_found": True
            }
            return JsonResponse(json_resp, safe=False)

        upper = number_of_request
        lower = number_of_request - 10

        # Fetching chat last message objects for the user
        chat_last_msg_objs = ChatLastMessage.objects.filter(
            users__uid=user_uid
        ).order_by("-updated_at")[lower:upper]

        friend_with_last_msg_list = []

        # Adding user info and last message into the friend_with_last_msg_list list
        for item in chat_last_msg_objs:
            friend = item.chat.user2 if str(
                item.chat.user1.uid) == user_uid else item.chat.user1
            friend_with_last_msg_list.append({
                "friend": {
                    "uid": friend.uid,
                    "username": friend.username,
                    "email": friend.email,
                    "current_profile_pic": friend.current_profile_pic.url if friend.current_profile_pic else None
                },
                "last_msg": item.last_message
            })

        # Fetching all the friends of the user
        friends = friend_obj.friends.all().order_by(
            "-created_at")[lower:upper-len(friend_with_last_msg_list)]

        # Adding those friends info and last message into the friend_with_last_msg_list list
        for friend in friends:
            # Check if friend already in the ChatLastMessage object list.
            # If it is in the ChatLastMessage object list, then simply continue, else iterate next
            friend_obj_exist = ChatLastMessage.objects.filter(
                users__uid=friend.uid
            )

            if friend_obj_exist.exists():
                continue
            friend_with_last_msg_list.append({"friend": {
                "uid": friend.uid,
                "username": friend.username,
                "email": friend.email,
                "current_profile_pic": friend.current_profile_pic.url if friend.current_profile_pic else None
            }, "last_msg": None, "created_at": None})

        del friends

        json_resp = {
            "error": False,
            "get_friends_with_last_msg_success": True,
            "friends_with_last_message": friend_with_last_msg_list
        }

        return JsonResponse(json_resp, safe=False)


class ChatMessageList(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = ChatMessage.objects.all()
        serializer = ChatMessageSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        resp_msg = {
            "error": True
        }

        send_message = request.data.get("sendMessage", None)

        if send_message == "true":
            sender_uid = request.data.get("senderUid", None)
            message = request.data.get("message", None)
            chat_uid = request.data.get("chatroomUid", None)

            if sender_uid is not None and message is not None and len(message.strip()) > 0 and chat_uid is not None:
                chat_obj = Chat.get_chat_obj_using_uid(self, chat_uid)
                sender_obj = Account.get_account_obj_using_uid(
                    self, sender_uid)

                if chat_obj is None or sender_obj is None:
                    resp_msg = {
                        "error": True,
                        "invalid_request": True
                    }
                    return Response(resp_msg)
                else:
                    receiver_obj = chat_obj.user2 if chat_obj.user1.uid == sender_obj.uid else chat_obj.user1
                    receiver_token = Account.check_for_account_token(
                        self, receiver_obj)

                    if receiver_token is None:
                        resp_msg = {
                            "error": True,
                            "receiver_token_not_found": True
                        }
                        return Response(resp_msg)

                    chat_message_obj = ChatMessage(
                        chat=chat_obj,
                        sender=sender_obj,
                        message=message.strip()
                    )
                    chat_message_obj.save()

                    chat_last_msg_obj, created = ChatLastMessage.objects.get_or_create(
                        chat=chat_obj
                    )
                    chat_last_msg_obj.users.add(sender_obj.uid)
                    chat_last_msg_obj.users.add(receiver_obj.uid)
                    chat_last_msg_obj.last_message = message.strip()
                    chat_last_msg_obj.updated_at = timezone.now()
                    chat_last_msg_obj.save(
                        update_fields=["last_message", "updated_at"])

                    resp_msg = {
                        "error": False,
                        "message_send_success": True,
                        "chat_message_uid": chat_message_obj.uid,
                        "receiver_token": receiver_token.key
                    }
                    return Response(resp_msg)
            else:
                return Response(resp_msg)

        return Response(resp_msg)


class ChatMessageDetail(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return ChatMessage.objects.get(uid=uid)
        except ChatMessage.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = ChatMessageSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = ChatMessageSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ChatMessageSeenList(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = ChatMessageSeen.objects.all()
        serializer = ChatMessageSeenSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ChatMessageSeenSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatMessageSeenDetail(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return ChatMessageSeen.objects.get(uid=uid)
        except ChatMessageSeen.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = ChatMessageSeenSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = ChatMessageSeenSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ChatCounterList(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = ChatCounter.objects.all()
        serializer = ChatCounterSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = ChatCounterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatCounterDetail(APIView):
    permission_classes = (IsAuthenticated, )
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return ChatCounter.objects.get(uid=uid)
        except ChatCounter.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = ChatCounterSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = ChatCounterSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
