# Generated by Django 4.2.7 on 2023-11-13 19:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0018_pays'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userprofile',
            name='selectedPays',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.pays'),
        ),
    ]
