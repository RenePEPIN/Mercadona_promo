from django.db import models


class Categorie(models.Model):
    libelle = models.CharField(max_length=255)


class Produit(models.Model):
    libelle = models.CharField(max_length=255)
    description = models.TextField()
    prix = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    image = models.ImageField(upload_to="produits_images/")
    categorie = models.ForeignKey(Categorie, on_delete=models.CASCADE)
    en_promotion = models.BooleanField(default=False)
    prix_promotion = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )


class Promotion(models.Model):
    produit = models.ForeignKey(Produit, on_delete=models.CASCADE)
    date_de_debut = models.DateField()
    date_de_fin = models.DateField()
    pourcentage_de_remise = models.DecimalField(max_digits=5, decimal_places=2)
