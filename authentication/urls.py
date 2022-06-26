from django.urls import path

from .views import (
    AccountList, AccountDetail, 
    UserProfilePicList, UserProfilePicDetail,
    UpdatePasswordDetail, UpdatePasswordList,
    CheckForValidToken, FetchTokenInfo,
    FetchUserProfileSomePicsView, FetchUserAllProfilePicsView
)


app_name = "authentication"
urlpatterns = [
    path("account-list/", AccountList.as_view()),
    path("account-detail/<str:uid>/", AccountDetail.as_view()),
    path("user-profile-pic-list/", UserProfilePicList.as_view()),
    path("user-profile-pic-detail/<str:uid>/", UserProfilePicDetail.as_view()),
    path("update-password-list/", UpdatePasswordList.as_view()),
    path("update-password-detail/<int:pk>/", UpdatePasswordDetail.as_view()),
    path("check-for-token-validation/<str:token>/", CheckForValidToken.as_view()),
    path("fetch-user-info/<str:token>/", FetchTokenInfo.as_view()),
    path("fetch-user-some-profile-pics/<str:user_uid>/", FetchUserProfileSomePicsView.as_view()),
    path("fetch-user-all-profile-pics/<str:user_uid>/<int:number_of_pics>/", FetchUserAllProfilePicsView.as_view()),
]