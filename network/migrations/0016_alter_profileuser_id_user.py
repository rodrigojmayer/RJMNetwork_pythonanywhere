# Generated by Django 3.2.8 on 2021-10-23 15:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0015_alter_profileuser_id_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profileuser',
            name='id_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='profile_user', to=settings.AUTH_USER_MODEL),
        ),
    ]
