from django.urls import path

from .views import (
    PostList, PostDetail,
    CommentList, CommentDetail,
    LikeList, LikeDetail,
    ProfileUserPostView,
)

app_name = "post"
urlpatterns = [
    path("post-list/", PostList.as_view()),
    path("post-detail/<str:uid>/", PostDetail.as_view()),
    path("comment-list/", CommentList.as_view()),
    path("comment-detail/<str:uid>/", CommentDetail.as_view()),
    path("like-list/", LikeList.as_view()),
    path("like-detail/<str:uid>/", LikeDetail.as_view()),
    path("fetch-profile-user-posts/<str:user_uid>/<int:number_of_posts>/", ProfileUserPostView.as_view()),
]