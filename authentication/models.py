from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from uuid import uuid4
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from PIL import Image


class AccountManager(BaseUserManager):
    def create_user(self, email, username, password=None):
        if not email:
            return ValueError("Email field is required!")
        elif not username:
            return ValueError("Username field is required!")

        email = self.normalize_email(email)

        user = self.model(email=email, username=username)
        user.set_password(password)
        user.save()

    def create_superuser(self, email, username, password=None):
        if not email:
            return ValueError("Email field is required!")
        elif not username:
            return ValueError("Username field is required!")

        email = self.normalize_email(email)

        user = self.model(email=email, username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()


class UserProfilePic(models.Model):
    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    image = models.ImageField(upload_to="images/profile", null=True)
    char_created_at = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return str(self.uid)


class Account(AbstractBaseUser):
    GENDER = (
        ("Male", "Male"),
        ("Female", "Female"),
        ("Other", "Other")
    )

    WORKING_STATUS = (
        ("Studying", "Studying"),
        ("Working", "Working"),
        ("Both", "Both"),
        ("None", "None")
    )

    RELATION_STATUS = (
        ("Single", "Single"),
        ("Married", "Married")
    )

    uid = models.UUIDField(primary_key=True, editable=False, default=uuid4)
    username = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    address = models.CharField(max_length=200, null=True, blank=True)
    phone_no = models.CharField(max_length=20, null=True, blank=True)
    gender = models.CharField(
        max_length=20, choices=GENDER, null=True, blank=True)
    working_status = models.CharField(
        max_length=50, choices=WORKING_STATUS, null=True, blank=True)
    studying_at = models.CharField(max_length=120, null=True, blank=True)
    job_position = models.CharField(max_length=120, null=True, blank=True)
    working_at = models.CharField(max_length=120, null=True, blank=True)
    relation_status = models.CharField(
        max_length=30, choices=RELATION_STATUS, null=True, blank=True)
    current_profile_pic = models.ImageField(
        upload_to="images/profile", null=True, blank=True)
    all_profile_pics = models.ManyToManyField(UserProfilePic, blank=True)
    char_created_at = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    char_updated_at = models.CharField(max_length=200, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    objects = AccountManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    def has_perm(self, perm, obj=None):
        return self.is_superuser

    def has_module_perms(self, app_label):
        return self.is_superuser

    def __str__(self):
        return self.email

    def save(self):
        super(Account, self).save()

        if self.current_profile_pic:
            img = Image.open(self.current_profile_pic.path)
            if img.width > 800 or img.height > 600:
                img = img.resize((800, 600), Image.ANTIALIAS)
                img.save(self.current_profile_pic.path)


@receiver(post_save, sender=Account)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class UpdatePassword(models.Model):
    user = models.ForeignKey(Account, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid4)
    char_created_at = models.CharField(max_length=200, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    char_updated_at = models.CharField(max_length=200, null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return str(self.token)
