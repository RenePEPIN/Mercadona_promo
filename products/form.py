from django import forms
from .models import Categorie, Produit, Promotion


class CategorieForm(forms.ModelForm):
    class Meta:
        model = Categorie
        fields = ["libelle"]  # Utilisez le nom de champ en minuscules


class ProduitForm(forms.ModelForm):
    class Meta:
        model = Produit
        fields = [
            "libelle",
            "description",
            "prix",
            "image",
            "categorie",
        ]  # Utilisez le nom de champ en minuscules


class PromotionForm(forms.ModelForm):
    class Meta:
        model = Promotion
        fields = [
            "produit",
            "date_de_debut",
            "date_de_fin",
            "pourcentage_de_remise",
        ]  # Utilisez le nom de champ en minuscules
