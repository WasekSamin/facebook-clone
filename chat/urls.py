from django.urls import path

from .views import (
    ChatList, ChatDetail,
    ChatMessageList, ChatMessageDetail,
    ChatMessageSeenList, ChatMessageSeenDetail,
    ChatCounterList, ChatCounterDetail,
    FetchUserChatObjView, FetchChatroomMessagesView,
    FetchFriendsWithLastMessagesView,
)

app_name = "chat"
urlpatterns = [
    path("chat-list/", ChatList.as_view()),
    path("chat-detail/<str:uid>/", ChatDetail.as_view()),
    path("chat-message-list/", ChatMessageList.as_view()),
    path("chat-message-detail/<str:uid>/", ChatMessageDetail.as_view()),
    path("chat-message-seen-list/", ChatMessageSeenList.as_view()),
    path("chat-message-seen-detail/<str:uid>/",
         ChatMessageSeenDetail.as_view()),
    path("chat-counter-list/", ChatCounterList.as_view()),
    path("chat-counter-detail/<str:uid>/", ChatCounterDetail.as_view()),
    path("fetch-chat-object/<str:user_uid>/<str:profile_uid>/",
         FetchUserChatObjView.as_view()),
    path("fetch-chatroom-messages/<str:chat_uid>/<int:number_of_request>/", FetchChatroomMessagesView.as_view()),
    path("fetch-friend-with-last-message/<str:user_uid>/<int:number_of_request>/", FetchFriendsWithLastMessagesView.as_view()),
]
