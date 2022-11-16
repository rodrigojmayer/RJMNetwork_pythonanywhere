# Generated by Django 3.2.8 on 2021-11-27 21:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0032_newpost_likes'),
    ]

    operations = [
        migrations.CreateModel(
            name='Likers',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('liker', models.ManyToManyField(related_name='user_liker', to=settings.AUTH_USER_MODEL)),
                ('post', models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='post_liked', to='network.newpost')),
            ],
        ),
    ]
