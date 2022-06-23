from rest_framework import serializers

from .models import Account, AccountProfilePics, UpdatePassword


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = "__all__"


class AccountProfilePicsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountProfilePics
        fields = "__all__"
        depth = 1


class UpdatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpdatePassword
        fields = "__all__"

