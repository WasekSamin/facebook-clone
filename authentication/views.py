from .models import Account, UpdatePassword, UserProfilePic
from post.models import Post
from .serializers import AccountSerializer, UpdatePasswordSerializer, UserProfilePicSerializer
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
from facebook_core.current_datetime import get_current_datetime


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
                    current_datetime = get_current_datetime()
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


def get_account_obj_using_uid(user_uid):
    try:
        account_obj = Account.objects.get(uid=user_uid)
    except Account.DoesNotExist:
        return None
    else:
        return account_obj


class AccountDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return Account.objects.get(uid=uid)
        except Account.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = AccountSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        resp_msg = {
            "error": True
        }

        profile_pic_upload = request.data.get("profilePicUpload", None)
        edit_profile_data = request.data.get("editProfileData", None)

        if profile_pic_upload == "true":
            profile_pic = request.data.get("profilePic", None)
            content_img_data = request.data.get("contentImgData", None)

            if profile_pic is not None and content_img_data is not None:
                account_obj = get_account_obj_using_uid(uid)

                if account_obj is None:
                    return Response(resp_msg)
                else:
                    current_datetime = get_current_datetime()

                    user_profile_pic_obj = UserProfilePic(
                        image=profile_pic,
                        char_created_at=current_datetime
                    )
                    user_profile_pic_obj.save()

                    account_obj.current_profile_pic = profile_pic
                    account_obj.save()

                    account_obj.all_profile_pics.add(user_profile_pic_obj.uid)

                    post_obj = Post(
                        user=account_obj,
                        content=f'''
                            <p>
                                <strong>{account_obj.username} updated the profile picture.</strong>
                            </p>
                            <p>
                                <img src={content_img_data} />
                            </p>
                        ''',
                        char_created_at=current_datetime
                    )
                    post_obj.save()

                    resp_msg = {
                        "error": False,
                        "profile_pic_uploaded": True,
                        "account_obj_uid": account_obj.uid,
                        "post_obj_uid": post_obj.uid,
                    }
            else:
                return Response(resp_msg)
        elif edit_profile_data == "true":
            user_uid = request.data.get("profileUid", None)
            username = request.data.get("username", None)
            address = request.data.get("address", None)
            work_status = request.data.get("workStatus", None)
            studying_at = request.data.get("studyingAt", None)
            working_at = request.data.get("workingAt", None)
            job_position = request.data.get("jobPosition", None)
            phone_no = request.data.get("phoneNo", None)
            gender = request.data.get("gender", None)
            relation_status = request.data.get("relationStatus", None)

            if username is not None and user_uid is not None:
                account_obj = get_account_obj_using_uid(user_uid)

                if account_obj is None:
                    return Response(resp_msg)
                else:
                    if phone_no == "null":
                        phone_no = None
                    if work_status == "null":
                        work_status = None
                    if gender == "null":
                        gender = None
                    if relation_status == "null":
                        relation_status = None

                    if phone_no is not None and len(phone_no) > 0:
                        if phone_no[0] == "+":
                            phone_first_char = phone_no[0]
                            phone_no = phone_no[1:]

                        try:
                            phone_no = int(phone_no)
                        except ValueError:
                            resp_msg = {
                                "error": True,
                                "invalid_format": True
                            }
                            return Response(resp_msg)
                        else:
                            phone_no = f"{phone_first_char}{phone_no}"

                    if work_status is not None:
                        if work_status != "Studying" and work_status != "Working" and work_status != "Both" and work_status != "None":
                            return Response(resp_msg)
                        elif work_status == "Studying":
                            working_at = None
                            job_position = None
                        elif work_status == "Working":
                            studying_at = None
                        elif work_status == "None":
                            working_at = None
                            studying_at = None
                            job_position = None
                    if gender is not None and (gender != "Male" and gender != "Female"):
                        return Response(resp_msg)
                    if relation_status is not None and (relation_status != "Single" and relation_status != "Married"):
                        return Response(resp_msg)

                    # Update account
                    current_datetime = get_current_datetime()

                    account_obj.username = username
                    account_obj.address = address
                    account_obj.working_status = work_status
                    account_obj.studying_at = studying_at
                    account_obj.working_at = working_at
                    account_obj.job_position = job_position
                    account_obj.phone_no = phone_no
                    account_obj.gender = gender
                    account_obj.relation_status = relation_status
                    account_obj.char_updated_at = current_datetime

                    account_obj.save()

                    resp_msg = {
                        "error": False,
                        "account_updated": True,
                        "account_obj_uid": account_obj.uid
                    }
                    return Response(resp_msg)
            else:
                return Response(resp_msg)
        return Response(resp_msg)

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


# Only grab 9 photos order by "-created_at"
class FetchUserProfileSomePicsView(View):
    def get(self, request, user_uid):
        json_resp = {
            "error": True
        }

        account_obj = get_account_obj_using_uid(user_uid)

        if account_obj is None:
            return JsonResponse(json_resp, safe=False)
        else:
            profile_pics = account_obj.all_profile_pics.all().order_by("-created_at")[0:9]
            profile_pic_list = list(map(lambda pic: {
                "uid": pic.uid,
                "image": pic.image.url if pic.image else None,
                "char_created_at": pic.char_created_at,
                "created_at": pic.created_at
            }, profile_pics))

            json_resp = {
                "error": False,
                "profile_pic_found": True,
                "profile_pics": profile_pic_list
            }

        return JsonResponse(json_resp, safe=False)


class FetchUserAllProfilePicsView(View):
    def get(self, request, user_uid, number_of_pics):
        json_resp = {
            "error": False
        }

        print("NUMBER OF PICS:", number_of_pics)

        account_obj = get_account_obj_using_uid(user_uid)

        if account_obj is None:
            return JsonResponse(json_resp, safe=False)
        else:
            upper = number_of_pics
            lower = upper - 3

            print(f"{upper=}, {lower=}")

            profile_pics = account_obj.all_profile_pics.all().order_by("-created_at")[lower:upper]
            profile_pic_list = list(map(lambda pic: {
                "uid": pic.uid,
                "image": pic.image.url if pic.image else None,
                "char_created_at": pic.char_created_at,
                "created_at": pic.created_at
            }, profile_pics))

            print(len(profile_pic_list))

            json_resp = {
                "error": False,
                "profile_pic_found": True,
                "profile_pics": profile_pic_list
            }

        return JsonResponse(json_resp, safe=False)


class UserProfilePicList(APIView, CustomPagination):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get(self, request, format=None):
        snippets = UserProfilePic.objects.all().order_by("-created_at")
        results = self.paginate_queryset(snippets, request, view=self)
        serializer = UserProfilePicSerializer(results, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = UserProfilePicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfilePicDetail(APIView):
    permission_classes = (IsAuthenticated,)
    authentication_classes = (TokenAuthentication, )

    def get_object(self, uid):
        try:
            return UserProfilePic.objects.get(uid=uid)
        except UserProfilePic.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = UserProfilePicSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = UserProfilePicSerializer(snippet, data=request.data)
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

    def get_object(self, uid):
        try:
            return UpdatePassword.objects.get(uid=uid)
        except UpdatePassword.DoesNotExist:
            raise Http404

    def get(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = UpdatePasswordSerializer(snippet)
        return Response(serializer.data)

    def put(self, request, uid, format=None):
        snippet = self.get_object(uid)
        serializer = UpdatePasswordSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, uid, format=None):
        snippet = self.get_object(uid)
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
