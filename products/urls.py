from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Créez un routeur pour gérer les vues basées sur le modèle (CRUD) pour les catégories, produits et promotions.
router = DefaultRouter()
router.register(r"categories", views.CategorieViewSetAPI)
router.register(r"produits", views.ProduitViewSet)
router.register(r"promotions", views.PromotionViewSetAPI)
router.register(r"search", views.ProduitSearchViewSet)

# Liste des URL de votre application
urlpatterns = [
    # URL pour une vue de test simple
    path("test/", views.test_view, name="test_view"),
    # URL pour créer un nouveau produit
    path("creer_produit/", views.CreerNouveauProduit.as_view(), name="creer_produit"),
    # URL pour mettre à jour un produit existant par son ID
    path(
        "modifier_produit/<int:pk>/",
        views.ModifierProduitView.as_view(),
        name="modifier_produit",
    ),
    # URL pour lister tous les produits
    path("liste_produits/", views.ListeProduitsView.as_view(), name="liste_produits"),
    # URL pour supprimer un produit par son ID
    path(
        "supprimer_produit/<int:pk>/",
        views.ProduitDeleteView.as_view(),
        name="supprimer_produit",
    ),
    # URL pour télécharger un fichier (image)
    path(
        "telecharger_fichier/",
        views.FileUploadView.as_view(),
        name="telecharger_fichier",
    ),
    # Route pour la recherche de produits
    path(
        "api/v1/products/search/",
        views.ProduitSearchViewSet.as_view({"get": "list"}),
        name="search_products",
    ),
    # Incluez les URL du routeur dans l'URL de l'application.
    path("", include(router.urls)),
]
