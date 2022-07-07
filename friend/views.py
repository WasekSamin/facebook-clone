from .models import Friend, FriendRequest
from authentication.models import Account
from notification.models import Notification
from .serializers import FriendSerializer, FriendRequestSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from facebook_core.custom_pagination import CustomPagination
from django.views import View


# Fetch 9 friends of the user/current profile
class FetchUserSomeFriendsVeiew(View):
    def get(self, request, user_uid):
        json_resp = {
            "error": True
        }

        try:
            friend_obj = Friend.objects.get(user__uid=user_uid)
        except Friend.DoesNotExist:
            json_resp = {
                "error": False,
                "error_finding_friend": True
            }
            return JsonResponse(json_resp, safe=False)
        else:
            friends = friend_obj.friends.all().order_by("-created_at")[0:9]

            friend_list = list(map(lambda friend: {
                "uid": friend.uid,
                "username": friend.username,
                "email": friend.email,
                "address": friend.address,
                "phone_no": friend.phone_no,
                "working_status": friend.working_status,
                "studying_at": friend.studying_at,
                "working_at": friend.working_at,
                "job_position": friend.job_position,
                "current_profile_pic": friend.current_profile_pic.url if friend.current_profile_pic else None,
                "gender": friend.gender,
                "relation_status": friend.relation_status,
                "created_at": friend.created_at,
                "updated_at": friend.updated_at
            }, friends))

            json_resp = {
                "error": False,
                "friend_found": True,
                "friends": friend_list
            }

        return JsonResponse(json_resp, safe=False)

class FetchUserAllFriendsView(View):
    def get(self, request, user_uid, number_of_requests):
        json_resp = {
            "error": True
        }

        try:
            friend_obj = Friend.objects.get(user__uid=user_uid)
        except Friend.DoesNotExist:
            json_resp = {
                "error": False,
                "error_finding_friend": True,
                "total_friends": 0
            }
        else:
            upper = number_of_requests
            lower = upper - 30

            all_friends = friend_obj.friends.all().order_by("-created_at")
            friend_counter = len(all_friends)
            friends = all_friends[lower:upper]
            del all_friends

            friend_list = list(map(lambda friend: {
                "uid": friend.uid,
                "username": friend.username,
                "email": friend.email,
                "address": friend.address,
                "phone_no": friend.phone_no,
                "working_status": friend.working_status,
                "studying_at": friend.studying_at,
                "working_at": friend.working_at,
                "job_position": friend.job_position,
                "current_profile_pic": friend.current_profile_pic.url if friend.current_profile_pic else None,
                "gender": friend.gender,
                "relation_status": friend.relation_status,
                "created_at": friend.created_at,
                "updated_at": friend.updated_at
            }, friends))

            json_resp = {
                "error": False,
                "friend_found": True,
                "friends": friend_list,
                "friend_counter": friend_counter
            }

        return JsonResponse(json_resp, safe=False)


class FriendList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Friend.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = FriendSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FriendSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FriendDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Friend.objects.get(uid=uid)
        except Friend.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = FriendSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = FriendSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class FetchUserAllFriendRequestsView(View):
    def get(self, request, user_uid, number_of_requests):
        json_resp = {
            "error": True
        }

        try:
            friend_request_obj = FriendRequest.objects.get(user__uid=user_uid)
        except FriendRequest.DoesNotExist:
            json_resp = {
                "error": False,
                "error_found_friend_request": True,
                "total_friend_requests": 0
            }
        else:
            upper = number_of_requests
            lower = upper - 30

            friend_requests = friend_request_obj.friend_request_senders.all().order_by(
                "-created_at")[lower:upper]

            friend_request_list = list(map(
                lambda item: {
                    "uid": item.uid,
                    "username": item.username,
                    "email": item.email,
                    "address": item.address,
                    "phone_no": item.phone_no,
                    "working_status": item.working_status,
                    "studying_at": item.studying_at,
                    "working_at": item.working_at,
                    "job_position": item.job_position,
                    "current_profile_pic": item.current_profile_pic.url if item.current_profile_pic else None,
                    "gender": item.gender,
                    "relation_status": item.relation_status,
                    "created_at": item.created_at,
                    "updated_at": item.updated_at
                }, friend_requests
            ))

            json_resp = {
                "error": False,
                "friend_request_found": True,
                "friend_requests": friend_request_list
            }

        return JsonResponse(json_resp, safe=False)


class FetchCurrentProfileFriendOptionWithUserView(View):
    def get(self, request, user_uid, profile_uid):
        json_resp = {
            "error": True
        }

        account_obj = Account.get_account_obj_using_uid(self, user_uid)

        if account_obj is None:
            return JsonResponse(json_resp, safe=False)
        else:
            # Check if logged in user is in friend list of current profile
            try:
                friend_obj = Friend.objects.get(user__uid=profile_uid)
            except Friend.DoesNotExist:
                # Check if the logged in user is in the friend request list of current profile
                is_user_in_friend_request_list = FriendRequest.check_if_user_in_friend_request_list(
                    self, account_obj, profile_uid)

                if is_user_in_friend_request_list:
                    json_resp = {
                        "error": False,
                        "user_is_in_friend_request": True
                    }
                    return JsonResponse(json_resp, safe=False)
                else:
                    # Check if the current profile is in the friend request list of logged in user
                    current_profile_obj = Account.get_account_obj_using_uid(
                        self, profile_uid)

                    if current_profile_obj is None:
                        json_resp = {
                            "error": True,
                        }
                        return JsonResponse(json_resp, safe=False)
                    else:
                        is_current_profile_in_user_friend_request_list = FriendRequest.check_if_user_in_friend_request_list(
                            self, current_profile_obj, account_obj.uid)

                        if is_current_profile_in_user_friend_request_list:
                            json_resp = {
                                "error": False,
                                "current_profile_is_in_friend_request": True
                            }
                            return JsonResponse(json_resp, safe=False)
                        else:
                            json_resp = {
                                "error": False,
                                "no_friend_option": True
                            }
                            return JsonResponse(json_resp, safe=False)
            else:
                is_user_in_friend_list = account_obj in friend_obj.friends.all()

                if is_user_in_friend_list:
                    json_resp = {
                        "error": False,
                        "user_is_friend": True
                    }
                    return JsonResponse(json_resp, safe=False)
                else:
                    # Check if the logged in user is in the friend request list of current profile
                    is_user_in_friend_request_list = FriendRequest.check_if_user_in_friend_request_list(
                        self, account_obj, profile_uid)

                    if is_user_in_friend_request_list:
                        json_resp = {
                            "error": False,
                            "user_is_in_friend_request": True
                        }
                        return JsonResponse(json_resp, safe=False)
                    else:
                        # Check if the current profile is in the friend request list of logged in user
                        current_profile_obj = Account.get_account_obj_using_uid(
                            self, profile_uid)

                        if current_profile_obj is None:
                            json_resp = {
                                "error": True,
                            }
                            return JsonResponse(json_resp, safe=False)
                        else:
                            is_current_profile_in_user_friend_request_list = FriendRequest.check_if_user_in_friend_request_list(
                                self, current_profile_obj, account_obj.uid)

                            if is_current_profile_in_user_friend_request_list:
                                json_resp = {
                                    "error": False,
                                    "current_profile_is_in_friend_request": True
                                }
                                return JsonResponse(json_resp, safe=False)
                            else:
                                json_resp = {
                                    "error": False,
                                    "no_friend_option": True
                                }
                                return JsonResponse(json_resp, safe=False)

        return JsonResponse(json_resp, safe=False)


class FriendRequestList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = FriendRequest.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = FriendRequestSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        resp_msg = {
            "error": True
        }

        add_friend = request.data.get("addFriend", None)
        delete_sent_request = request.data.get("deleteSentRequest", None)
        delete_receive_request = request.data.get("deleteReceiveRequest", None)
        accept_friend_request = request.data.get("acceptFriendRequest", None)
        remove_friend = request.data.get("removeFriend", None)

        # Sending friend request
        if add_friend == "true":
            current_profile_uid = request.data.get("currentProfile", None)
            logged_in_user_uid = request.data.get("loggedInUser", None)

            if current_profile_uid is not None and logged_in_user_uid is not None:
                current_profile_obj = Account.get_account_obj_using_uid(self, current_profile_uid)    # Current profile user
                user_obj = Account.get_account_obj_using_uid(self, logged_in_user_uid)    # Logged in user

                if current_profile_obj is None or user_obj is None:
                    return Response(resp_msg)
                else:
                    friend_request_obj, created = FriendRequest.objects.get_or_create(user=current_profile_obj)

                    receiver_token = Account.check_for_account_token(self, current_profile_obj)

                    if receiver_token is None:
                        resp_msg = {
                            "error": True
                        }
                        return Response(resp_msg)

                    friend_request_obj.friend_request_senders.add(user_obj.uid)

                    # Create notification object for receiver
                    notification_obj = Notification(
                        user=current_profile_obj,
                        notification_type="friend",
                        notified_sender=user_obj,
                        friend_request=friend_request_obj
                    )
                    notification_obj.save()

                    resp_msg = {
                        "error": False,
                        "friend_request_sent_success": True,
                        "friend_request_sender": {
                            "uid": user_obj.uid,
                            "username": user_obj.username,
                            "email": user_obj.email,
                            "address": user_obj.address,
                            "phone_no": user_obj.phone_no,
                            "working_status": user_obj.working_status,
                            "studying_at": user_obj.studying_at,
                            "working_at": user_obj.working_at,
                            "job_position": user_obj.job_position,
                            "current_profile_pic": user_obj.current_profile_pic.url if user_obj.current_profile_pic else None,
                            "gender": user_obj.gender,
                            "relation_status": user_obj.relation_status,
                            "created_at": user_obj.created_at,
                            "updated_at": user_obj.updated_at
                        },
                        "friend_request_receiver": {
                            "uid": current_profile_obj.uid,
                            "username": current_profile_obj.username,
                            "email": current_profile_obj.email,
                            "address": current_profile_obj.address,
                            "phone_no": current_profile_obj.phone_no,
                            "working_status": current_profile_obj.working_status,
                            "studying_at": current_profile_obj.studying_at,
                            "working_at": current_profile_obj.working_at,
                            "job_position": current_profile_obj.job_position,
                            "current_profile_pic": current_profile_obj.current_profile_pic.url if current_profile_obj.current_profile_pic else None,
                            "gender": current_profile_obj.gender,
                            "relation_status": current_profile_obj.relation_status,
                            "created_at": current_profile_obj.created_at,
                            "updated_at": current_profile_obj.updated_at
                        },
                        "receiver_token": receiver_token.key,
                        "notification_obj_uid": notification_obj.uid,
                    }
                    return Response(resp_msg)
            else:
                return Response(resp_msg)
        # If sender delete friend request or receiver delete the friend request
        elif delete_sent_request == "true" or delete_receive_request == "true":
            current_profile_uid = request.data.get("currentProfile", None)
            user_uid = request.data.get("loggedInUser", None)

            if current_profile_uid is not None and user_uid is not None:
                current_profile_obj = Account.get_account_obj_using_uid(self, current_profile_uid)
                user_obj = Account.get_account_obj_using_uid(self, user_uid)

                if current_profile_obj is None or user_obj is None:
                    return Response(resp_msg)
                else:
                    if delete_receive_request == "true":
                        current_profile_obj, user_obj = user_obj, current_profile_obj

                    friend_request_obj = FriendRequest.get_friend_request_obj(self, current_profile_obj)

                    if friend_request_obj is None:
                        resp_msg = {
                            "error": True,
                            "friend_request_not_exist": True
                        }
                        return Response(resp_msg)
                    else:
                        if delete_sent_request == "true":
                            receiver_token = Account.check_for_account_token(self, current_profile_obj)
                        else:
                            receiver_token = Account.check_for_account_token(self, user_obj)

                        if receiver_token is None:
                            resp_msg = {
                                "error": True
                            }
                            return Response(resp_msg)

                        is_user_in_current_profile_friend_request_list = user_obj in friend_request_obj.friend_request_senders.all()

                        if is_user_in_current_profile_friend_request_list:
                            friend_request_obj.friend_request_senders.remove(user_obj.uid)
                        else:
                            resp_msg = {
                                "error": True,
                                "user_not_in_friend_request_list": True
                            }
                            return Response(resp_msg)

                        notification_obj = Notification.objects.filter(
                            friend_request=friend_request_obj,
                            user=current_profile_obj,
                            notified_sender=user_obj,
                            notification_type="friend"
                        ).first()

                        if notification_obj is None:
                            resp_msg = {
                                "error": True,
                                "notification_obj_not_found": True
                            }
                            return Response(resp_msg)                            
                        else:
                            notification_obj.delete()

                            resp_msg = {
                                "error": False,
                                "delete_sent_request_success": True,
                                "receiver_token": receiver_token.key
                            }

                            if delete_receive_request == "true":
                                del resp_msg["delete_sent_request_success"]
                                resp_msg["delete_receive_request_success"] = True

                            return Response(resp_msg)
            else:
                return Response(resp_msg)
        # If receiver accept the friend request
        elif accept_friend_request == "true":
            current_profile_uid = request.data.get("currentProfile", None)
            user_uid = request.data.get("loggedInUser", None)

            if current_profile_uid is not None and user_uid is not None:
                current_profile_obj = Account.get_account_obj_using_uid(self, current_profile_uid)
                user_obj = Account.get_account_obj_using_uid(self, user_uid)

                if current_profile_obj is None or user_obj is None:
                    return Response(resp_msg)
                else:
                    friend_request_obj = FriendRequest.get_friend_request_obj(self, user_obj)

                    if friend_request_obj is None:
                        resp_msg = {
                            "error": True,
                            "friend_request_not_exist": True
                        }
                        return Response(resp_msg)
                    else:
                        receiver_token = Account.check_for_account_token(self, current_profile_obj)

                        if receiver_token is None:
                            resp_msg = {
                                "error": True
                            }
                            return Response(resp_msg)

                        is_current_profile_in_user_friend_request_list = current_profile_obj in friend_request_obj.friend_request_senders.all()

                        if is_current_profile_in_user_friend_request_list:
                            friend_request_obj.friend_request_senders.remove(current_profile_obj.uid)

                            receiver_friend_obj, created = Friend.objects.get_or_create(
                                user=user_obj
                            )
                            sender_friend_obj, created = Friend.objects.get_or_create(
                                user=current_profile_obj
                            )

                            receiver_friend_obj.friends.add(current_profile_obj.uid)
                            sender_friend_obj.friends.add(user_obj.uid)

                            notification_obj = Notification.objects.filter(
                                friend_request=friend_request_obj,
                                user=user_obj,
                                notified_sender=current_profile_obj,
                                notification_type="friend"
                            ).first()

                            if notification_obj is None:
                                resp_msg = {
                                    "error": True,
                                    "notification_obj_not_found": True
                                }
                                return Response(resp_msg)
                            else:
                                notification_obj.is_friend_request_accepted = True
                                notification_obj.save()

                                resp_msg = {
                                    "error": False,
                                    "receiver_accept_friend_request": True,
                                    "receiver_token": receiver_token.key
                                }
                                return Response(resp_msg)
                        else:
                            resp_msg = {
                                "error": True,
                                "user_not_in_friend_request_list": True
                            }
                            return Response(resp_msg)

            else:
                return Response(resp_msg)
        # Unfriend by sender or receiver
        elif remove_friend == "true":
            current_profile_uid = request.data.get("currentProfile", None)
            user_uid = request.data.get("loggedInUser", None)

            if current_profile_uid is not None and user_uid is not None:
                current_profile_obj = Account.get_account_obj_using_uid(self, current_profile_uid)
                user_obj = Account.get_account_obj_using_uid(self, user_uid)

                if current_profile_obj is None or user_obj is None:
                    return Response(resp_msg)
                else:
                    user_friend_obj = Friend.get_friend_obj(self, user_obj)
                    current_profile_friend_obj = Friend.get_friend_obj(self, current_profile_obj)

                    receiver_token = Account.check_for_account_token(self, current_profile_obj)

                    if receiver_token is None:
                        resp_msg = {
                            "error": True
                        }
                        return Response(resp_msg)

                    if user_friend_obj is None or current_profile_friend_obj is None:
                        resp_msg = {
                            "error": True,
                            "friend_obj_not_found": True
                        }
                    else:                        
                        user_friend_obj.friends.remove(current_profile_obj.uid)
                        current_profile_friend_obj.friends.remove(user_obj.uid)

                        resp_msg = {
                            "error": False,
                            "remove_friend_success": True,
                            "receiver_token": receiver_token.key
                        }
            else:
                return Response(resp_msg)

        return Response(resp_msg)


class FriendRequestDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return FriendRequest.objects.get(uid=uid)
        except FriendRequest.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = FriendRequestSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = FriendRequestSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
