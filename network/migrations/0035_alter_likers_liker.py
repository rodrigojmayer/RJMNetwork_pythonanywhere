# Generated by Django 3.2.8 on 2021-12-01 10:22

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0034_remove_newpost_likes'),
    ]

    operations = [
        migrations.AlterField(
            model_name='likers',
            name='liker',
            field=models.ManyToManyField(blank=True, related_name='user_liker', to=settings.AUTH_USER_MODEL),
        ),
    ]
