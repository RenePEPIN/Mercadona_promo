# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from . import views

# Créez un routeur
router = DefaultRouter()
router.register(r"user-list", views.UserViewSet, basename="user-list")
router.register(
    r"user-profiles-list", views.UserProfileViewSet, basename="user-profiles"
)
router.register(r"register-user", views.UserViewSet, basename="register-user")

# Utilisez RegisterUserView comme une vue normale, pas un viewset
urlpatterns = [
    path("", include(router.urls)),
]
