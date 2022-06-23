from django.urls import path

from .views import (
    AccountList, AccountDetail, 
    AccountProfilePicDetail, AccountProfilePicList, 
    UpdatePasswordDetail, UpdatePasswordList,
    CheckForValidToken, FetchTokenInfo,
    FetchUserPostedPicsView,
)


app_name = "authentication"
urlpatterns = [
    path("account-list/", AccountList.as_view()),
    path("account-detail/<str:uid>/", AccountDetail.as_view()),
    path("account-profile-pic-list/", AccountProfilePicList.as_view()),
    path("account-profile-pic-detail/<str:uid>/", AccountProfilePicDetail.as_view()),
    path("update-password-list/", UpdatePasswordList.as_view()),
    path("update-password-detail/<int:pk>/", UpdatePasswordDetail.as_view()),
    path("check-for-token-validation/<str:token>/", CheckForValidToken.as_view()),
    path("fetch-user-info/<str:token>/", FetchTokenInfo.as_view()),
    path("fetch-user-profile-pics/<str:user_uid>/", FetchUserPostedPicsView.as_view()),
]