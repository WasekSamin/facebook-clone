from .models import Account, AccountProfilePics, UpdatePassword
from .serializers import AccountSerializer, AccountProfilePicsSerializer, UpdatePasswordSerializer
from django.http import Http404, JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from facebook_core.custom_pagination import CustomPagination
from django.contrib.auth.hashers import check_password
from rest_framework.authtoken.models import Token
from django.views import View
from django.contrib.auth import authenticate, login
from datetime import datetime


# If account exists, return the account obj, else return None
def check_for_account_exist(email):
    try:
        account_obj = Account.objects.get(email=email)
    except Account.DoesNotExist:
        return None
    else:
        return account_obj


# Return token if user is valid
def check_for_account_token(account_obj):
    try:
        token_obj = Token.objects.get(user=account_obj)
    except Token.DoesNotExist:
        return None
    else:
        return token_obj


# Return datetime in string format
def get_current_time():
    dt = datetime.now()
    dt = datetime.strftime(dt, "%d %b, %Y %I:%M:%S %p")
    return dt


class AccountList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = Account.objects.all().order_by("-created_at")
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = AccountSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        resp_msg = {
            "error": True
        }

        username = request.data.get("username", None)
        email = request.data.get("email", None)
        password = request.data.get("password", None)
        register = request.data.get("register", None)

        if register == "true":
            #### FOR REGISTRATION ####
            if username is not None and email is not None and password is not None:
                account_exist = check_for_account_exist(email)

                if account_exist is not None:
                    resp_msg = {
                        "error": True,
                        "account_already_exist": True
                    }
                else:
                    current_datetime = get_current_time()
                    account_obj = Account(
                        username=username,
                        email=email,
                        char_created_at=current_datetime
                    )
                    account_obj.set_password(password)
                    account_obj.save()

                    resp_msg = {
                        "error": False,
                        "account_created": True,
                        "account_uid": account_obj.uid
                    }
        else:
            #### FOR LOGIN ####
            user = authenticate(email=email, password=password)

            if user is not None:
                login(request, user)

                token_obj = check_for_account_token(user)

                if token_obj is not None:
                    resp_msg = {
                        "error": False,
                        "token": str(token_obj.key),
                        "login_success": True
                    }
                    return Response(resp_msg)
                else:
                    resp_msg = {
                        "login_failed": True,
                        "invalid_token": True
                    }
                    return Response(resp_msg)
            else:
                resp_msg = {
                    "error": True,
                    "account_not_exist": True
                }
                return Response(resp_msg)

        return Response(resp_msg)


class AccountDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Account.objects.get(pk=uid)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = AccountSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = AccountSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CheckForValidToken(View):
    def get(self, request, token):
        json_resp = {
            "error": True
        }

        try:
            token_obj = Token.objects.get(key=token)

            json_resp = {
                "error": False,
                "token_valid": True
            }
        except Token.DoesNotExist:
            return JsonResponse(json_resp, safe=False)
        return JsonResponse(json_resp, safe=False)


class FetchTokenInfo(View):
    def get(self, request, token):
        json_resp = {
            "error": True
        }

        try:
            token_obj = Token.objects.get(key=token)

            json_resp = {
                "user_uid": token_obj.user.uid,
                "user_found": True
            }
        except Token.DoesNotExist:
            return JsonResponse(json_resp, safe=False)

        return JsonResponse(json_resp, safe=False)


class FetchUserPostedPicsView(View):
    def get(self, request, user_uid):
        json_resp = {
            "error": True
        }

        try:
            account_profile__pic_obj = AccountProfilePics.objects.get(user__uid=user_uid)
        except AccountProfilePics.DoesNotExist:
            return JsonResponse(json_resp, safe=False)
        else:
            json_resp = {
                "error": False,
                "account_profile_pic_obj_found": True,
                "account_profile_pic_obj_uid": account_profile__pic_obj.uid
            }
            return JsonResponse(json_resp, safe=False)
        return JsonResponse(json_resp, safe=False)


class AccountProfilePicList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = AccountProfilePics.objects.all().order_by("-created_at")
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = AccountProfilePicsSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = AccountProfilePicsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AccountProfilePicDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return AccountProfilePics.objects.get(uid=uid)
        except AccountProfilePics.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = AccountProfilePicsSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = AccountProfilePicsSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class UpdatePasswordList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = UpdatePassword.objects.all().order_by("-created_at")
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = UpdatePasswordSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UpdatePasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdatePasswordDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, pk):
        try:
            return UpdatePassword.objects.get(pk=pk)
        except UpdatePassword.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = UpdatePasswordSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        snippet = self.get_object(pk)
        serializer = UpdatePasswordSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        snippet = self.get_object(pk)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)