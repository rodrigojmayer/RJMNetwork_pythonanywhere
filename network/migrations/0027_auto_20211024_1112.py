# Generated by Django 3.2.8 on 2021-10-24 11:12

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0026_followers'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='followers',
            name='followed',
        ),
        migrations.AddField(
            model_name='followers',
            name='followed',
            field=models.ManyToManyField(related_name='user_followed', to=settings.AUTH_USER_MODEL),
        ),
        migrations.RemoveField(
            model_name='followers',
            name='follower',
        ),
        migrations.AddField(
            model_name='followers',
            name='follower',
            field=models.ManyToManyField(related_name='user_follower', to=settings.AUTH_USER_MODEL),
        ),
    ]
