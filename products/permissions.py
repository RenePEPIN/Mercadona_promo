from rest_framework.permissions import (
    BasePermission,
)
import logging

# Créez une instance de journalisation
logger = logging.getLogger(__name__)

# Utilisez le journal pour enregistrer des messages
logger.info("Ceci est un message d'information")
logger.warning("Ceci est un avertissement")
logger.error("Ceci est une erreur")


from django.contrib.auth.decorators import user_passes_test


from rest_framework.views import APIView


def is_admin(user):
    return user.is_authenticated and user.is_admin


# Appliquez le décorateur @user_passes_test pour restreindre l'accès aux administrateurs
@user_passes_test(is_admin)
def modifier_produit(request, productId):
    # Votre logique de modification de produit
    # ...
    logger = logging.getLogger(__name__)


class IsAuthenticatedOrTokenHasScope(BasePermission):
    """
    Permission customisée pour vérifier si l'utilisateur est authentifié ou si le jeton a un scope spécifié.
    """

    REQUIRED_SCOPE = "read_write"

    def has_permission(self, request, view):
        # Vérifiez d'abord si l'utilisateur est authentifié.
        if request.user and request.user.is_authenticated:
            return True

        # Si l'utilisateur n'est pas authentifié, vérifiez le jeton.
        token = request.auth
        if token:
            # Ici, je suppose que le jeton est une instance avec un attribut 'scopes'.
            # Cela dépend de votre implémentation d'authentification par jeton.
            has_required_scope = self.REQUIRED_SCOPE in getattr(token, "scopes", [])
            if not has_required_scope:
                logger.warning(
                    f"Token does not have the required scope: {self.REQUIRED_SCOPE}"
                )
            return has_required_scope

        logger.warning("Request does not have a valid authentication token.")
        return False
