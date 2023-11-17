import React, { useState, useEffect } from 'react';
import axios from './axiosConfig';
import { useDispatch, useSelector } from 'react-redux';
import { createCartItem } from './Features/cart';

function PromotionPage() {
    // États
    const [allProducts, setAllProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(
        'Voir toute la catégorie'
    );
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const dispatch = useDispatch(); // Hook useDispatch pour envoyer des actions Redux
    const cartItems = useSelector((state) => state.cart.cartItems); //

    // Effets
    useEffect(() => {
        fetchPromotionProducts();
        fetchAllCategories();
    }, []);

    const fetchPromotionProducts = async () => {
        try {
            const response = await axios.get('/api/v1/products/produits/');
            const promoProducts = response.data.filter(
                (product) => product.en_promotion
            );
            setAllProducts(promoProducts);
            setProducts(promoProducts);
        } catch (error) {
            setError(error);
        }
    };

    const fetchAllCategories = async () => {
        try {
            const response = await axios.get('/api/v1/products/categories/');
            const filteredCategories = response.data.filter(
                (category) => category.libelle !== 'Nouvelle Saison'
            );
            setCategories(filteredCategories);
        } catch (error) {
            setError(error);
        }
    };

    const filterProductsByCategory = (categoryId) => {
        setSelectedCategory(categoryId);
        if (categoryId === 'Voir toute la catégorie') {
            setProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter(
                (product) =>
                    product.categorie === parseInt(categoryId) ||
                    categoryId === 'Voir toute la catégorie'
            );
            setProducts(filteredProducts);
        }
    };

    return (
        <div className="px-6">
            {/* Titre du catalogue */}
            <h1 className="text-gray-800 text-2xl mb-6">
                Produits En Promotion
            </h1>

            {/* Filtre par catégorie */}
            <select
                value={selectedCategory}
                onChange={(e) => filterProductsByCategory(e.target.value)}
                className="mb-4 p-2 border rounded"
            >
                <option value="Voir toute la catégorie">
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
                                className="mb-4"
                                src={product.image}
                                alt={product.libelle}
                            />
                            <div className="flex flex-col mb-6">
                                <p className="text-gray-700 text-lg">
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
                                    // Dispatch de l'action createCartItem pour ajouter l'article au panier Redux
                                    dispatch(createCartItem(product));
                                    // Log de l'ajout au panier dans la console
                                    console.log(
                                        'Article ajouté au panier :',
                                        product
                                    );
                                }}
                                className={`${
                                    cartItems.some(
                                        (item) => item.id === product.id
                                    )
                                        ? 'bg-green-700'
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

export default PromotionPage;
