# Generated by Django 3.2.8 on 2021-11-01 10:37

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0029_alter_followers_follower'),
    ]

    operations = [
        migrations.AlterField(
            model_name='followers',
            name='follower',
            field=models.ManyToManyField(related_name='user_follower', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='followers',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]