# Generated by Django 3.2.8 on 2021-10-20 10:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0008_auto_20211019_1815'),
    ]

    operations = [
        migrations.AddField(
            model_name='newpost',
            name='user',
            field=models.OneToOneField(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='profile', to='network.user'),
            preserve_default=False,
        ),
    ]