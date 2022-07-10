# Generated by Django 4.0.5 on 2022-07-09 22:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('chat', '0003_chatmessage_sender'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChatLastMessage',
            fields=[
                ('uid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('last_message', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('updated_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('chat', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='chat_last_message_chat', to='chat.chat')),
                ('users', models.ManyToManyField(related_name='chat_last_message_users', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
