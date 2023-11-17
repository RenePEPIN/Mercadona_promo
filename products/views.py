# products/views.py

# Importations nécessaires
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import UpdateAPIView
from rest_framework import viewsets
from .models import Produit, Categorie, Promotion
from .serializers import ProduitSerializer, CategorieSerializer, PromotionSerializer
from rest_framework import filters
from django.db.models import Q


# Vue de test pour vérifier que tout fonctionne.
def test_view(request):
    return JsonResponse({"message": "It works!"})


# Vue pour gérer les opérations CRUD sur les produits.
class ProduitViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer


# Vue pour créer un nouveau produit.
class CreerNouveauProduit(APIView):
    def post(self, request, *args, **kwargs):
        serializer = ProduitSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# Vue pour mettre à jour un produit existant.
class ModifierProduitView(UpdateAPIView):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer


# Vue pour lister toutes les catégories.
class CategoriesListView(APIView):
    def get(self, request):
        categories = Categorie.objects.all()
        serializer = CategorieSerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Vue pour lister tous les produits.
class ListeProduitsView(APIView):
    def get(self, request):
        produits = Produit.objects.all()
        serializer = ProduitSerializer(produits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Vue pour gérer les opérations CRUD sur les catégories.
class CategorieViewSetAPI(viewsets.ModelViewSet):
    queryset = Categorie.objects.all()
    serializer_class = CategorieSerializer


# Vue pour gérer les opérations CRUD sur les promotions.
class PromotionViewSetAPI(viewsets.ModelViewSet):
    queryset = Promotion.objects.all()
    serializer_class = PromotionSerializer


# Vue pour supprimer un produit.
class ProduitDeleteView(APIView):
    def delete(self, request, pk):
        try:
            produit = Produit.objects.get(pk=pk)
            produit.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Produit.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)


# Vue pour télécharger un fichier (image).
class FileUploadView(APIView):
    def post(self, request, format=None):
        uploaded_file = request.FILES["image"]
        # Logique de gestion de l'enregistrement du fichier (à compléter).
        return Response(
            {"message": "Fichier téléchargé avec succès."},
            status=status.HTTP_201_CREATED,
        )


# Champs à rechercher (par exemple, nom et description)
class ProduitSearchViewSet(viewsets.ModelViewSet):
    queryset = Produit.objects.all()
    serializer_class = ProduitSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ["libelle", "description", "prix", "categorie__nom"]

    def get_queryset(self):
        queryset = Produit.objects.all()
        # Ajoutez votre logique de filtrage ou de recherche personnalisée ici si nécessaire
        query = self.request.query_params.get("query", None)
        if query:
            queryset = queryset.filter(
                Q(libelle__icontains=query)
                | Q(description__icontains=query)
                | Q(prix__icontains=query)
            )
        return queryset
