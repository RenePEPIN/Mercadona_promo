from django.urls.resolvers import URLPattern, URLResolver
from typing import List, Tuple, Union
from django.urls import reverse


# Définissez la fonction pour extraire les URLs de l'API
def extract_api_urls(
    url_patterns: List[Union[URLPattern, URLResolver]]
) -> List[Tuple[str, str]]:
    # Initialisez une liste pour stocker les URLs de l'API
    api_urls = []

    # Parcourez les modèles d'URL fournis en entrée
    for pattern in url_patterns:
        if isinstance(pattern, URLPattern):
            # Si c'est un URLPattern, obtenez le nom de la vue associée
            view_name = pattern.callback.__name__

            # Vérifiez si le nom de vue existe
            if view_name:
                # Utilisez le nom de vue pour obtenir l'URL correspondante
                url = reverse(view_name)
                # Ajoutez le nom de vue et l'URL à la liste des URLs de l'API
                api_urls.append((view_name, url))
        elif isinstance(pattern, URLResolver):
            # Si c'est un URLResolver, récursivement extrayez les URLs
            sub_api_urls = extract_api_urls(pattern.url_patterns)
            # Ajoutez les URLs extraites à la liste des URLs de l'API
            api_urls.extend(sub_api_urls)

    # Retournez la liste des URLs de l'API
    return api_urls
