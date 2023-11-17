from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    civilite = models.CharField(max_length=255, default="Monsieur")
    postal_code = models.CharField(max_length=20, default="")
    complementAdresse = models.CharField(max_length=255)
    ville = models.CharField(max_length=255, default="Ville")
    selectedPays = models.CharField(max_length=255, default="Pays")
    adresse = models.TextField(default="Votre_adresse")
    date_de_naissance = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to="avatars/", null=True, blank=True)

    def __str__(self):
        return self.user.username

    @classmethod
    def register_user(cls, user_data):
        # Créer un nouvel utilisateur avec les données du formulaire
        new_user = User.objects.create_user(
            username=user_data["email"],
            email=user_data["email"],
            password=user_data["password"],
        )

        UserProfile.objects.create(date_de_naissance=user_data[""])

        # Créer le profil utilisateur associé
        user_profile = cls.objects.create(
            user=new_user,
            civilite=user_data.get("civilite", "Monsieur"),
            postal_code=user_data.get("postal_code", "00000"),
            ville=user_data.get("ville", "Ville"),
            selectedPays=user_data.get("Pays", ""),  # Correction de la virgule ici
            complementAdresse=user_data.get("complementAdresse", ""),
            adresse=user_data.get("adresse", "Votre_adresse"),
            date_de_naissance=user_data.get("date_de_naissance", None),
            avatar=user_data.get("avatar", None),
        )

        return user_profile
