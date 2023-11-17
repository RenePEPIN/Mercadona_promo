# view_globale.py

import json
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from users.models import UserProfile
from users.views import *


def bienvenue(request):
    message = "<h1>Bienvenue dans l'application Mercadona</h1>"
    admin_link = "<a href='/admin/'>Accéder à l'interface d'administration</a>"
    api_links = [
        ("Swagger API Documentation", "http://127.0.0.1:8000/swagger/"),
        ("API Endpoint 2", "/api/endpoint2/"),
        # Ajoutez d'autres liens d'API ici
    ]

    api_links_html = "".join(
        [
            f"<a href='{link_url}'>{link_name}</a><br>"
            for link_name, link_url in api_links
        ]
    )

    user = User.objects.get(pk=1)
    user_profile = UserProfile.objects.get(user=user)
    user_profile.civilite = "M."
    user_profile.nom = "Nouveau Nom"
    user_profile.save()

    update_message = "<p>Profil utilisateur mis à jour avec succès.</p>"

    response = f"{message}<p>{admin_link}</p><p>{api_links_html}</p>{update_message}"
    return HttpResponse(response)
