# Generated by Django 3.2.8 on 2021-10-20 10:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0009_newpost_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newpost',
            name='poster',
        ),
    ]
