from .models import Notification, NotificationCounter
from friend.models import Friend, FriendRequest
from authentication.models import Account
from .serializers import NotificationSerializer, NotificationCounterSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from facebook_core.custom_pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.views import View


class FetchUserNotificationsView(View):
    def get(self, request, user_uid, number_of_requests):
        json_resp = {
            "error": True
        }

        upper = number_of_requests
        lower = upper - 30

        notifications = Notification.objects.filter(
            user__uid=user_uid).order_by("-created_at")[lower:upper]
        notification_list = list(map(
            lambda notification: {
                "uid": notification.uid,
                "notification_type": notification.notification_type,
                "is_friend_request_accepted": notification.is_friend_request_accepted,
                "is_notification_seen": notification.is_notification_seen,
                "notified_sender": {
                    "uid": notification.notified_sender.uid,
                    "username": notification.notified_sender.username,
                    "current_profile_pic": notification.notified_sender.current_profile_pic.url if notification.notified_sender.current_profile_pic else None
                },
                "post": notification.post.uid if notification.post else None,
                "friend_request": notification.friend_request.uid if notification.friend_request else None,
                "created_at": notification.created_at
            }, notifications
        ))

        json_resp = {
            "error": False,
            "notification_found": True,
            "notifications": notification_list,
        }

        return JsonResponse(json_resp, safe=False)


class NotificationList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Notification.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = NotificationSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NotificationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Notification.objects.get(uid=uid)
        except Notification.DoesNotExist:
            return None

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)

        if snippet is None:
            resp_msg = {
                "error": True
            }
            return Response(resp_msg)

        serializer = NotificationSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        resp_msg = {
            "error": True
        }

        accept_friend_request = request.data.get("acceptFriendRequest", None)

        if accept_friend_request == "true":
            notification_obj = self.get_object(uid)

            if notification_obj is None:
                resp_msg = {
                    "error": True
                }
                return Response(resp_msg)
            
            if not notification_obj.is_friend_request_accepted:
                receiver_token = Account.check_for_account_token(self, notification_obj.notified_sender)

                if receiver_token is None:
                    resp_msg = {
                        "error": True,
                        "receiver_token_not_found": True
                    }
                    return Response(resp_msg)

                notification_sender_uid = notification_obj.notified_sender.uid
                notification_obj.friend_request.friend_request_senders.remove(notification_sender_uid)

                receiver_friend_obj, created = Friend.objects.get_or_create(
                    user=notification_obj.user
                )
                receiver_friend_obj.friends.add(notification_sender_uid)
                
                sender_friend_obj, created = Friend.objects.get_or_create(
                    user=notification_obj.notified_sender
                )
                sender_friend_obj.friends.add(notification_obj.user.uid)

                notification_obj.is_friend_request_accepted = True
                notification_obj.save(update_fields=["is_friend_request_accepted"])

                resp_msg = {
                    "error": False,
                    "friend_request_accepted": True,
                    "receiver_token": receiver_token.key,
                    "notification_sender_uid": notification_sender_uid
                }
            else:
                resp_msg = {
                    "error": True,
                    "friend_request_already_accepted": True
                }
                return Response(resp_msg)

        return Response(resp_msg)

    def delete(self, request, uid, format=None):
        notification_obj = self.get_object(uid)

        if notification_obj is None:
            resp_msg = {
                "error": True
            }
            return Response(resp_msg)

        if notification_obj.notification_type == "friend":
            notification_sender_uid = notification_obj.notified_sender.uid
            notification_obj.friend_request.friend_request_senders.remove(notification_sender_uid)

            receiver_token = Account.check_for_account_token(self, notification_obj.notified_sender)

            if receiver_token is None:
                resp_msg = {
                    "error": True,
                    "receiver_token_not_found": True
                }
                return Response(resp_msg)

        notification_obj.delete()

        resp_msg = {
            "error": False,
            "notification_friend_request_deleted": True,
            "receiver_token": receiver_token.key,
            "notification_sender_uid": notification_sender_uid
        }

        return Response(resp_msg)


class NotificationCounterList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = NotificationCounter.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = NotificationCounterSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = NotificationCounterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class NotificationCounterDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return NotificationCounter.objects.get(uid=uid)
        except NotificationCounter.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = NotificationCounterSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = NotificationCounterSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
