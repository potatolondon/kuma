# -*- coding: utf-8 -*-
# Generated by Django 1.11.15 on 2018-10-08 09:17
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_user_discourse_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='customer_id',
            field=models.CharField(blank=True, max_length=255, verbose_name='Stripe customer ID'),
        ),
    ]
