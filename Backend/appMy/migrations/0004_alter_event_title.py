# Generated by Django 5.0.3 on 2024-03-18 20:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('appMy', '0003_alter_event_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='title',
            field=models.TextField(blank=True, max_length=255, null=True),
        ),
    ]
