import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Header = () => {
    // États pour le terme de recherche, les produits filtrés et la visibilité du menu
    const [searchTerm, setSearchTerm] = useState('');
    // eslint-disable-next-line
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [menuVisible, setMenuVisible] = useState(false);
    const navigate = useNavigate();

    // Fonction appelée lorsqu'un utilisateur clique sur le bouton "Rechercher"
    const handleSearchClick = async () => {
        // Vérifie si le terme de recherche n'est pas vide
        if (searchTerm.trim() !== '') {
            try {
                // Effectue une requête à l'API avec le terme de recherche
                const response = await axios.get(
                    `http://localhost:8000/api/v1/products/search/?query=${searchTerm}`
                );
                // Met à jour les produits filtrés avec les résultats de la recherche
                setFilteredProducts(response.data);
            } catch (error) {
                // Affiche une erreur en cas d'échec de la recherche
                console.error('Erreur lors de la recherche :', error);
            }
        } else {
            // Affiche un message si le terme de recherche est vide
            console.log('Le terme de recherche est vide.');
        }

        // Réinitialise le terme de recherche après la recherche
        setSearchTerm('');
    };

    // Fonction appelée lorsqu'un utilisateur clique sur le bouton "Catalogues"
    const handleCataloguesClick = () => {
        // Redirige l'utilisateur vers la page des catalogues
        navigate('/');
        // Ferme le menu après la navigation
        setMenuVisible(false);
        console.log('Afficher les catalogues');
    };

    // Fonction appelée lorsqu'un utilisateur clique sur le bouton "En promos"
    const handlePromosClick = () => {
        // Redirige l'utilisateur vers la page des produits en promotion
        navigate('/PromotionPage');
        // Ferme le menu après la navigation
        setMenuVisible(false);
        console.log('Afficher les produits en promotion');
    };

    // Fonction appelée lorsqu'un utilisateur clique sur le bouton "Connectez-vous"
    const handleConnectClick = () => {
        // Redirige l'utilisateur vers la page de connexion
        navigate('/Composants/authentification/LoginPage');
        // Ferme le menu après la navigation
        setMenuVisible(false);
    };

    return (
        <nav className="bg-gray-800 p-4 py-6 flex justify-between items-center">
            {/* Logo au centre */}
            <div className="text-white font-bold text-xl">Logo</div>

            {/* Champ de recherche au centre */}
            <div className="relative flex items-center">
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-gray-700 text-white rounded-full py-2 px-4 focus:outline-none focus:shadow-outline"
                />
                <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white focus:outline-none focus:ring focus:border-blue-300"
                    onClick={handleSearchClick}
                >
                    {/* Icône de recherche */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 17l-4-4m0 0l4-4m-4 4h14"
                        />
                    </svg>
                </button>
            </div>

            {/* Menu à droite */}
            <div
                className={`lg:flex space-x-5 items-center ${
                    menuVisible ? 'block' : 'hidden'
                }`}
            >
                {/* Bouton Catalogues */}
                <button
                    className="text-white text-lg hover:text-gray-300"
                    onClick={handleCataloguesClick}
                >
                    Catalogues
                </button>

                {/* Bouton En promos */}
                <button
                    className="text-white text-lg hover:text-gray-300"
                    onClick={handlePromosClick}
                >
                    En promos
                </button>

                {/* Bouton Connectez-vous */}
                <button
                    className="text-white text-lg hover:text-gray-300"
                    onClick={handleConnectClick}
                >
                    Connectez-vous
                </button>
            </div>

            {/* Bouton de menu pour les écrans mobiles */}
            <div className="lg:hidden">
                <button
                    onClick={() => setMenuVisible(!menuVisible)}
                    className="text-white text-2xl"
                >
                    ☰
                </button>
            </div>
        </nav>
    );
};

export default Header;
