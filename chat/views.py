from .models import Chat, ChatMessageSeen, ChatCounter
from authentication.models import Account
from .serializers import ChatSerializer, ChatMessageSeenSerializer, ChatCounterSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from facebook_core.custom_pagination import CustomPagination
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class FetchUserChatObjView(View):
    def get(self, rqeuest, user_uid, profile_uid):
        json_resp = {
            "error": True
        }

        chat_obj = Chat.get_chat_obj_from_user_and_profile_uid(self, user_uid, profile_uid)

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