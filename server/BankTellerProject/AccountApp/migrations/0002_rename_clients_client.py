# Generated by Django 5.1.2 on 2024-10-23 20:01

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("AccountApp", "0001_initial"),
    ]

    operations = [
        migrations.RenameModel(
            old_name="Clients",
            new_name="Client",
        ),
    ]
