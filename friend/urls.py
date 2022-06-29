from django.urls import path

from .views import (
    FriendList, FriendDetail,
    FetchUserAllFriendsView,
)

app_name = "friend"
urlpatterns = [
    path("friend-list/", FriendList.as_view()),
    path("friend-detail/<str:uid>/", FriendDetail.as_view()),
    path("fetch-user-all-friends/<str:user_uid>/<int:number_of_requests>/", FetchUserAllFriendsView.as_view())
]