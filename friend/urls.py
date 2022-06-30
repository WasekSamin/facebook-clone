from django.urls import path

from .views import (
    FriendList, FriendDetail,
    FetchUserAllFriendsView, FetchUserAllFriendRequestsView,
    FetchCurrentProfileFriendOptionWithUserView,
    FriendRequestList, FriendRequestDetail,
)

app_name = "friend"
urlpatterns = [
    path("friend-list/", FriendList.as_view()),
    path("friend-detail/<str:uid>/", FriendDetail.as_view()),
    path("friend-request-list/", FriendRequestList.as_view()),
    path("friend-request-detail/<str:uid>/", FriendRequestDetail.as_view()),
    path("fetch-user-all-friends/<str:user_uid>/<int:number_of_requests>/", FetchUserAllFriendsView.as_view()),
    path("fetch-user-all-friends-requests/<str:user_uid>/<int:number_of_requests>/", FetchUserAllFriendRequestsView.as_view()),
    path("fetch-current-profile-friend-option-with-user/<str:user_uid>/<str:profile_uid>/", FetchCurrentProfileFriendOptionWithUserView.as_view()),
]