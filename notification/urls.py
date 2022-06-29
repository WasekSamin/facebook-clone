from django.urls import path

from .views import (
    NotificationList, NotificationDetail,
    NotificationCounterList, NotificationCounterDetail
)

app_name = "notification"
urlpatterns = [
    path("notification-list/", NotificationList.as_view()),
    path("notification-detail/<str:uid>/", NotificationDetail.as_view()),
    path("notification-counter-list/", NotificationCounterList.as_view()),
    path("notification-counter-detail/<str:uid>/", NotificationCounterDetail.as_view()),
]