from .models import Friend
from authentication.models import Account
from .serializers import FriendSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from facebook_core.custom_pagination import CustomPagination
from authentication.views import get_account_obj_using_uid
from django.views import View


class FriendList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Friend.objects.all().order_by("-created_at")
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = FriendSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = FriendSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
            lower = upper - 5

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
                "char_created_at": friend.char_created_at,
                "created_at": friend.created_at,
                "char_updated_at": friend.char_updated_at,
                "updated_at": friend.updated_at
            }, friends))

            json_resp = {
                "error": False,
                "friend_found": True,
                "friends": friend_list,
                "friend_counter": friend_counter
            }

        return JsonResponse(json_resp, safe=False)


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