# admin.py

from django.contrib import admin
from .models import Categorie, Produit, Promotion

admin.site.register(Categorie)
admin.site.register(Produit)
admin.site.register(Promotion)
