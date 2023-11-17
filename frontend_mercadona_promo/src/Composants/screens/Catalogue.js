import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { createCartItem } from './Features/cart';

function Catalogue() {
    // États locaux pour stocker les produits, la catégorie sélectionnée, les catégories disponibles, les erreurs et le panier
    const [allProducts, setAllProducts] = useState([]); // Tous les produits obtenus depuis l'API
    const [products, setProducts] = useState([]); // Produits affichés après filtrage par catégorie
    const [selectedCategory, setSelectedCategory] = useState(
        'Voir toute la catégorie '
    ); // Catégorie sélectionnée dans le filtre
    const [categories, setCategories] = useState([]); // Toutes les catégories disponibles
    const [error, setError] = useState(null); // Erreur en cas de problème lors de la récupération des données depuis l'API
    const dispatch = useDispatch(); // Hook useDispatch pour envoyer des actions Redux
    const cartItems = useSelector((state) => state.cart.cartItems); // Sélectionne les articles du panier depuis le state Redux
    const [initialLoad, setInitialLoad] = useState(true);

    // Effet de chargement initial pour obtenir tous les produits et catégories depuis l'API
    useEffect(() => {
        fetchAllProducts();
        fetchAllCategories();
    }, []);

    // Fonction pour récupérer tous les produits depuis l'API
    const fetchAllProducts = async () => {
        try {
            const response = await axios.get('/api/v1/products/produits/');
            setAllProducts(response.data);
            setProducts(response.data);
        } catch (error) {
            setError(error);
        }
    };

    // Fonction pour récupérer toutes les catégories depuis l'API
    const fetchAllCategories = async () => {
        try {
            const response = await axios.get('/api/v1/products/categories/');
            setCategories(response.data);
        } catch (error) {
            setError(error);
        }
    };

    // Fonction pour filtrer les produits par catégorie
    const filterProductsByCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 'Voir toute la catégorie ') {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(
                (product) =>
                    product.categorie === parseInt(categoryId) ||
                    categoryId === 'Voir toute la catégorie '
            );
            setProducts(filteredProducts);
        }
    };
    // Charger le panier depuis le localStorage lors du chargement initial
    useEffect(() => {
        if (initialLoad) {
            const savedCartItems = localStorage.getItem('cartItems');
            if (savedCartItems) {
                const parsedCartItems = JSON.parse(savedCartItems);
                parsedCartItems.forEach((item) => {
                    dispatch(createCartItem(item)); // Ajouter les articles au panier Redux
                });
            }
            setInitialLoad(false);
        }
    }, [initialLoad, dispatch]);

    // Mettre à jour le localStorage chaque fois que le panier change
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <div className="px-6">
            {/* Titre du catalogue */}
            <h1 className="text-gray-800 text-2xl mb-6">
                Catalogue de Produits
            </h1>

            {/* Filtre par catégorie */}
            <select
                value={selectedCategory}
                onChange={(e) => filterProductsByCategory(e.target.value)}
                className="mb-4 p-2 border rounded"
            >
                <option value="Voir toute la catégorie ">
                    Voir toute la catégorie
                </option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.libelle}
                    </option>
                ))}
            </select>

            {/* Liste des produits */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
                {products.length === 0 ? (
                    <p>Chargement en cours...</p>
                ) : (
                    products.map((product) => (
                        <li
                            key={product.id}
                            className="p-4 bg-gray-200 rounded flex flex-col"
                        >
                            {/* Image et informations sur le produit */}
                            <img
                                className="mb-10 h-25 object-cover w-full"
                                src={product.image}
                                alt={product.libelle}
                            />
                            <div className="flex flex-col mb-7 product-info-container">
                                <p className="text-gray-700 text-lg mb-2">
                                    {product.libelle}
                                </p>
                                <p className="text-gray-500 text-lg">
                                    {product.description}
                                </p>
                                {product.en_promotion ? (
                                    <div>
                                        <p className="text-gray-900 font-bold line-through">
                                            Prix: {product.prix} €
                                        </p>
                                        <p
                                            style={{
                                                fontWeight: 'bold',
                                                color: 'red',
                                            }}
                                        >
                                            Prix en Promotion:{' '}
                                            {product.prix_promotion} €
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-gray-900 font-bold">
                                        Prix: {product.prix} €
                                    </p>
                                )}
                            </div>

                            {/* Bouton d'ajout au panier */}
                            <button
                                onClick={() => {
                                    // Vérifie si le produit est déjà dans le panier
                                    const isItemInCart = cartItems.some(
                                        (item) => item.id === product.id
                                    );

                                    if (!isItemInCart) {
                                        // Si le produit n'est pas déjà dans le panier, l'ajouter
                                        dispatch(createCartItem(product));
                                        console.log(
                                            'Article ajouté au panier :',
                                            product
                                        );
                                    } else {
                                        // Si le produit est déjà dans le panier, vous pouvez afficher un message à l'utilisateur ou simplement ne rien faire
                                        console.log(
                                            'Article déjà dans le panier :',
                                            product
                                        );
                                    }
                                }}
                                className={`${
                                    cartItems.some(
                                        (item) => item.id === product.id
                                    )
                                        ? 'bg-red-600'
                                        : 'bg-gray-600'
                                } w-full text-white px-2 inline-flex items-center justify-center rounded p-2 mt-auto`}
                            >
                                {/* Texte du bouton en fonction de la présence de l'article dans le panier */}
                                {cartItems.some(
                                    (item) => item.id === product.id
                                )
                                    ? 'Article choisi ✔️'
                                    : 'Ajouter au panier'}
                            </button>
                        </li>
                    ))
                )}
            </ul>

            {/* Affiche les erreurs s'il y en a */}
            {error && (
                <p className="text-red-600 mt-4">Erreur : {error.message}</p>
            )}
        </div>
    );
}

export default Catalogue;
