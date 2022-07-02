from .models import Post, Comment, Like
from authentication.models import Account
from .serializers import PostSerializer, CommentSerializer, LikeSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from facebook_core.custom_pagination import CustomPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.views import View


# Showing 3 posts for now
class ProfileUserPostView(View):
    def get(self, request, **kwargs):
        json_resp = {
            "error": True
        }

        user_uid = kwargs["user_uid"]
        upper = kwargs["number_of_posts"]
        lower = upper - 3

        account_obj = Account.get_account_obj_using_uid(self, user_uid)

        if account_obj is None:
            return JsonResponse(json_resp, safe=False)
        
        post_objs = Post.objects.filter(user=account_obj).order_by("-created_at")[lower:upper]

        post_obj_list = list(map(
            lambda item: {
                "uid": item.uid,
                "user": {
                    "uid": item.user.uid,
                    "username": item.user.username,
                    "email": item.user.email,
                    "address": item.user.address,
                    "phone_no": item.user.phone_no,
                    "working_status": item.user.working_status,
                    "studying_at": item.user.studying_at,
                    "working_at": item.user.working_at,
                    "job_position": item.user.job_position,
                    "current_profile_pic": item.user.current_profile_pic.url if item.user.current_profile_pic else None, 
                    "gender": item.user.gender,
                    "relation_status": item.user.relation_status,
                    "created_at": item.user.created_at,
                    "updated_at": item.user.updated_at
                },
                "content": item.content,
                "created_at": item.created_at
            },
            post_objs
        ))
        
        json_resp = {
            "error": False,
            "posts_found": True,
            "posts": post_obj_list
        }

        return JsonResponse(json_resp)


class PostList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Post.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = PostSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        resp_msg = {
            "error": True
        }

        user_uid = request.data.get("userUid", None)
        content = request.data.get("content", None)

        if user_uid is not None and content is not None:
            try:
                user_obj = Account.objects.get(uid=user_uid)
            except Account.DoesNotExist:
                return Response(resp_msg)
            else:
                post_obj = Post(
                    user=user_obj,
                    content=content,
                )
                post_obj.save()

                resp_msg = {
                    "error": False,
                    "post_created": True,
                    "post_uid": post_obj.uid
                }

        return Response(resp_msg)


class PostDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Post.objects.get(uid=uid)
        except Post.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = PostSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = PostSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CommentList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Comment.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = CommentSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CommentDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Comment.objects.get(uid=uid)
        except Comment.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = CommentSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = CommentSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class LikeList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Like.objects.all()
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = LikeSerializer(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = LikeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LikeDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Like.objects.get(uid=uid)
        except Like.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = LikeSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = LikeSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)