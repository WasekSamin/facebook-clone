# Generated by Django 4.0.5 on 2022-07-02 03:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('post', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('friend', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='NotificationCounter',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('notification_counter', models.PositiveIntegerField(default=0)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('user', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_counter_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('notification_type', models.CharField(choices=[('friend', 'friend'), ('comment', 'comment'), ('Like', 'Like')], max_length=120, null=True)),
                ('is_notification_seen', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('friend_request', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_friend_request', to='friend.friendrequest')),
                ('notified_sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_notified_sender', to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_post', to='post.post')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='notification_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ('-created_at',),
            },
        ),
    ]