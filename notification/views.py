from .models import Notification, NotificationCounter
from .serializers import NotificationSerializer, NotificationCounterSerializer
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from facebook_core.current_datetime import get_current_datetime
from facebook_core.custom_pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication


class NotificationList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Notification.objects.all().order_by("-created_at")
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
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = NotificationSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = NotificationSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class NotificationCounterList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = NotificationCounter.objects.all().order_by("-created_at")
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