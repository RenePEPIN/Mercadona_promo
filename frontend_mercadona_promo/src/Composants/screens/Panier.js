import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateItemFromSelect, deleteFromCart } from './Features/cart';
import { v4 as uuidv4 } from 'uuid';
import '../../style/main.css';
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
export default function Panier({ onClose }) {
    // Utilisation du hook useSelector pour obtenir le state du panier depuis Redux
    const cart = useSelector((state) => state.cart);
    // Utilisation du hook useDispatch pour envoyer des actions Redux
    const dispatch = useDispatch();
    cart.cartItems.forEach((el) => {
        console.log('/images :', el.image);
    });

    //* Calcule le total en ajoutant les prix de chaque article multiplié par sa quantité */

    const totalWithoutPromotion = cart.cartItems.reduce((acc, curr) => {
        // Ajoute le prix de l'article (même s'il est en promotion) au total
        acc += curr.prix * curr.quantity;
        return acc;
    }, 0);

    //* Calcule le total avec promotion et la différence */

    const totalWithPromotion = cart.cartItems.reduce(
        (acc, curr) => {
            const prixArticleSansPromotion = curr.prix;
            const prixArticleAvecPromotion = curr.en_promotion
                ? curr.prix_promotion
                : curr.prix;
            const difference =
                prixArticleSansPromotion - prixArticleAvecPromotion;
            const prixArticleTotal =
                prixArticleSansPromotion * curr.quantity -
                difference * curr.quantity;
            return {
                totalDesArticles: acc.totalWithoutPromotion * curr.quantity,
                total: acc.total + prixArticleTotal,
                difference: acc.difference + difference * curr.quantity,
            };
        },
        { totalDesArticles: 0, total: 0, difference: 0 }
    );

    return (
        // La div de fond qui réagit au clic et ferme le panier lorsqu'elle est cliquée
        <div
            onClick={onClose}
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50"
        >
            {/* Le conteneur du panier */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center overflow-y-auto"
                style={{ width: '800px', height: '600px', marginTop: '20px' }}
            >
                {/* Bouton pour fermer le panier */}
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-2 mr-2 w-7 h-7 bg-red-600 text-slate-100 rounded flex justify-center items-center"
                >
                    X
                </button>

                {/* Liste des éléments du panier */}
                <ul className="custom-scroll">
                    {cart.cartItems.length > 0 ? (
                        // Si le panier contient des articles
                        cart.cartItems.map((el, index) => (
                            <li
                                key={uuidv4()}
                                className={`flex items-center mb-4 ${
                                    index === 0 ? 'mt-20' : ''
                                }`}
                            >
                                {/* Image de l'article */}
                                <img
                                    className="w-20 h-20 object-cover mr-4"
                                    src={el.image}
                                    alt={el.libelle}
                                />

                                {/* Titre de l'article */}
                                <div>
                                    <p className="text-lg font-semibold text-sm mb-1 ml-4">
                                        {el.libelle}
                                    </p>
                                    <p className="text-gray-400 text-sm ml-4 mr-4 ">
                                        {el.description}
                                    </p>
                                    {/* Affichage du prix */}
                                    <p className="text-sm ml-4 mt-2">
                                        {el.en_promotion ? (
                                            <span>
                                                <span
                                                    style={{
                                                        textDecoration:
                                                            'line-through',
                                                        color: 'gray',
                                                    }}
                                                >
                                                    {el.prix} €
                                                </span>{' '}
                                                <span style={{ color: 'red' }}>
                                                    Prix en Promotion:{' '}
                                                    {el.prix_promotion} €
                                                </span>
                                            </span>
                                        ) : (
                                            <span>{el.prix} €</span>
                                        )}
                                    </p>
                                </div>

                                {/* Sélecteur de quantité de l'article */}
                                <select
                                    name="quantity"
                                    // Lorsque la quantité est modifiée, envoie une action Redux pour mettre à jour la quantité
                                    onChange={(e) =>
                                        dispatch(
                                            updateItemFromSelect({
                                                value: e.target.value,
                                                id: el.id,
                                            })
                                        )
                                    }
                                    className="w-20 p-2 rounded border border-gray-300 mr-4 focus:outline-none focus:border-blue-500"
                                    value={el.quantity}
                                >
                                    {/* Options pour les quantités, de 1 à 6 */}
                                    {[1, 2, 3, 4, 5, 6].map((num) => (
                                        <option key={num} value={num}>
                                            {num}
                                        </option>
                                    ))}
                                </select>
                                {/* Bouton pour supprimer l'article du panier */}
                                <button
                                    onClick={() =>
                                        // Lorsque le bouton est cliqué, envoie une action Redux pour supprimer l'article du panier
                                        dispatch(deleteFromCart(el.id))
                                    }
                                    className="bg-gray-400 hover:bg-gray-700 text-white font-semibold p- rounded transition duration-300 ease-in-out"
                                >
                                    Enlever du Panier
                                </button>
                            </li>
                        ))
                    ) : (
                        // Si le panier est vide
                        <li className="mb-4">
                            Placez vos articles dans le panier...
                        </li>
                    )}
                </ul>
                {/* Affiche le total du panier */}
                <div className="text-xl">
                    <p className="font-semibold text-gray-600">Total</p>
                    <hr className="my-2" />
                    <p className="text-sm">
                        <span className="text-gray-700">
                            Total des articles :{' '}
                            {totalWithoutPromotion.toFixed(2)} €
                            <br />
                            <span className="text-red-500">
                                Réduction : -
                                {totalWithPromotion.difference.toFixed(2)} €
                            </span>
                        </span>
                    </p>
                    <hr className="my-2" />
                    <p className="text-black font-semibold text-lg">
                        Total : {totalWithPromotion.total.toFixed(2)} €
                    </p>
                </div>

                {/* Bouton pour procéder au paiement */}
                <button className="block mx-auto bg-slate-800 text-slate-200 rounded px-4 py-2 mt-7">
                    Procéder au payement
                </button>
            </div>
        </div>
    );
}
