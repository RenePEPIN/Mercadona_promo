# urls.py (fichier principal)

from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from django.conf import settings
from django.conf.urls.static import static
from . import view_globale

# Importez les URLs de vos applications

from users import user_urls

# Créez une vue de schéma pour l'API (si utilisée)
schema_view = get_schema_view(
    openapi.Info(
        title="Votre API",
        default_version="v1",
        description="Description de votre API",
        terms_of_service="https://www.votresite.com/terms/",
        contact=openapi.Contact(email="contact@votresite.com"),
        license=openapi.License(name="Licence BSD"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Définissez les URLs principales
urlpatterns = [
    path("", view_globale.bienvenue, name="bienvenue"),
    path("admin/", admin.site.urls),  # Assurez-vous d'utiliser admin.site.urls ici
    path(
        "swagger/",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    path("api/v1/products/", include("products.urls")),
    path("api/v1/users/", include(user_urls.urlpatterns)),
]

# Si on est en mode DEBUG, on ajoute les URLs pour les fichiers statiques
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
