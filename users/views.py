from rest_framework import status
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import viewsets
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.db import transaction
from .models import UserProfile
from .user_serializers import UserProfileSerializer, UserSerializer
import logging

logger = logging.getLogger(__name__)


# Fonction autonome pour la réponse d'erreur
def error_response(message, status=500):
    return Response({"error": message}, status=status)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    @action(detail=False, methods=["post"])
    @transaction.atomic
    def register_user(self, request):
        try:
            # Correction: Convert QueryDict to dictionary
            data = dict(request.data)
            civilite = data.get("civilite", "")
            email = data.get("email", "")
            password = data.get("password", "")
            codePostal = data.get("codePostal", "")
            complementAdresse = data.get("complementAdresse", "")
            selectedPays = data.get("selectedPays", "")
            nom = data.get("nom", "")
            prenom = data.get("prenom", "")

            # Concaténer nom et prénom pour créer le username
            username = f"{nom.lower()}_{prenom.lower()}"

            # Ajouter le username aux données avant de les valider
            data["username"] = username

            # Valider les données avec le serializer
            serializer = UserSerializer(data=data)
            if serializer.is_valid():
                user = serializer.save()
                # Vous pouvez éventuellement créer un UserProfile ici si nécessaire
                # UserProfile.objects.create(user=user, additional_field=value)
                return Response({"message": "Utilisateur créé avec succès"})
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except ValidationError as e:
            return error_response(f"Format d'e-mail invalide: {str(e)}", status=400)
        except IntegrityError as e:
            logger.error(
                f"Erreur d'intégrité lors de la création de l'utilisateur ou du profil : {e}"
            )
            return error_response(
                "Erreur d'intégrité lors de la création de l'utilisateur ou du profil",
                status=500,
            )
        except Exception as e:
            logger.error(f"Une erreur inattendue s'est produite : {e}")
        return error_response("Erreur interne du serveur", status=500)

    # Ajoutez une action pour lister les utilisateurs
    @action(detail=False, methods=["get"])
    def list_users(self, request):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def get_queryset(self):
        return UserProfile.objects.all()

    def perform_create(self, serializer):
        serializer.save()
