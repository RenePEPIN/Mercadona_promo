import json
from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from users.models import UserProfile
from django.db import connection
from rest_framework import status


class CustomTestCase(TestCase):
    def _pre_setup(self):
        # Utilisez une base de données en mémoire pour les tests
        self._old_names = connection.settings_dict["NAME"]
        connection.settings_dict["NAME"] = ":memory:"
        super()._pre_setup()

    def _post_teardown(self):
        # Rétablissez le nom de la base de données après les tests
        connection.settings_dict["NAME"] = self._old_names
        super()._post_teardown()


class BaseTestCase(TestCase):
    def setUp(self):
        self.register_url = reverse("register_user")
        self.valid_user_data = {
            "civilite": "M.",
            "nom": "Nom",
            "prenom": "Prénom",
            "email": "test@example.com",
            "password": "password123",
            "postal_code": "12345",
            "ville": "Ville",
            "selected_pays": "Pays",
            "adresse": "Adresse",
        }

    def tearDown(self):
        # Nettoyez la base de données après chaque test
        UserProfile.objects.all().delete()
        User.objects.all().delete()

    def test_register_user_duplicate_email(self):
        User.objects.create_user(
            username=self.valid_user_data["email"],
            email=self.valid_user_data["email"],
            password=self.valid_user_data["password"],
        )

        response = self.client.post(
            self.register_url,
            json.dumps(self.valid_user_data),
            content_type="application/json",
        )

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(User.objects.count(), 1)


def test_register_user_success(self):
    response = self.client.post(
        self.register_url,
        self.valid_user_data,
        format="json",
    )

    self.assertEqual(response.status_code, status.HTTP_200_OK)
    self.assertEqual(User.objects.count(), 1)
    created_user = User.objects.first()
    self.assertEqual(created_user.email, self.valid_user_data["email"])

    user_profile = created_user.userprofile
    self.assertEqual(user_profile.civilite, self.valid_user_data["civilite"])
    self.assertEqual(user_profile.nom, self.valid_user_data["nom"])
    self.assertEqual(user_profile.prenom, self.valid_user_data["prenom"])
    self.assertEqual(user_profile.postal_code, self.valid_user_data["postal_code"])
    self.assertEqual(user_profile.ville, self.valid_user_data["ville"])
    self.assertEqual(user_profile.selected_pays, self.valid_user_data["selected_pays"])
    self.assertEqual(user_profile.adresse, self.valid_user_data["adresse"])
