from rest_framework import serializers

from .models import Account, UpdatePassword, UserProfilePic


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class UserProfilePicSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfilePic
        fields = "__all__"
        depth = 1


class UpdatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdatePassword
        fields = "__all__"
        depth = 1

