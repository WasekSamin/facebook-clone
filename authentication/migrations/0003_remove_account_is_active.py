# Generated by Django 4.0.5 on 2022-06-22 18:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0002_remove_accountprofilepics_all_background_pics_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='account',
            name='is_active',
        ),
    ]