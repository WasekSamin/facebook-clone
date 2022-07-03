from django.test import TestCase
from authentication.models import Account
from .models import Notification

# Create your tests here.
class TestNotificationModel(TestCase):
    def setUp(self):
        user = Account(
            email="samin@gmail.com",
            username="Samin",
        )
        user.set_password("admin12345")
        user.save()

        Notification.objects.create(
            user=user,
            notification_type="friend"
        )

    def test_get_user_obj(self):
        user_obj = Account.objects.filter(
            email="sam@gmail.com"
        ).last()
        print(user_obj)

    # def test_get_notification_obj(self):