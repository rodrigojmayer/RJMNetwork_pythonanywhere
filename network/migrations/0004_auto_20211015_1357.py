# Generated by Django 3.1.2 on 2021-10-15 11:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('network', '0003_auto_20211015_0934'),
    ]

    operations = [
        migrations.AlterField(
            model_name='newpost',
            name='poster',
            field=models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='posts', to=settings.AUTH_USER_MODEL),
        ),
    ]
