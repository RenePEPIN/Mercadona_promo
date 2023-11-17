// AdresseForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Composant pour le formulaire d'adresse.
 * @param {Object} props - Les propriétés du composant.
 * @param {string} props.adresse - L'adresse.
 * @param {string} props.codePostal - Le code postal.
 * @param {string} props.complementAdresse - Le complément d'adresse.
 * @param {function} props.onAdresseChange - Fonction pour gérer le changement de l'adresse.
 * @param {function} props.onCodePostalChange - Fonction pour gérer le changement du code postal.
 * @param {function} props.onComplementAdresseChange - Fonction pour gérer le changement du complément d'adresse.
 */

function AdresseForm({
    adresse,
    codePostal,
    complementAdresse,
    onAdresseChange,
    onCodePostalChange,
    onComplementAdresseChange,
}) {
    const [error, setError] = useState('');
    const [ville, setVille] = useState('');

    // Fonction pour effacer les erreurs
    const clearError = () => {
        setError('');
    };

    // Fonction pour gérer le changement du code postal
    const handlePostalCodeChange = async (e) => {
        const codePostal = e.target.value;
        onCodePostalChange(codePostal);
        clearError();

        try {
            // Requête à l'API GeoAPI pour obtenir la ville par code postal
            const response = await axios.get(
                `https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=nom`
            );

            // Vérifiez si la réponse contient des données valides
            if (response.data.length > 0) {
                // Mettez à jour l'état de la ville avec la réponse de l'API
                setVille(response.data[0].nom);
            } else {
                // Si aucune ville n'est trouvée, réinitialisez l'état de la ville
                setVille('');
                setError(
                    `Aucune ville trouvée pour le code postal: ${codePostal}`
                );
            }
        } catch (error) {
            // Gérez l'erreur de manière appropriée
            setError(
                `Erreur lors de la recherche de la ville par code postal : ${error.message}. Veuillez réessayer plus tard.`
            );
            // Réinitialisez l'état de la ville en cas d'erreur
            setVille('');
        }
    };
    useEffect(() => {
        // Utilisez useEffect si nécessaire
    }, []);
    return (
        <div className="w-full max-w-sm">
            {/* Adresse */}
            <div className="mb-4">
                <label
                    htmlFor="adresse"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Adresse :
                </label>
                <input
                    type="text"
                    id="adresse"
                    value={adresse}
                    onChange={(e) => onAdresseChange(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Complément d'adresse */}
            <div className="mb-4">
                <label
                    htmlFor="complementAdresse"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Complément d'adresse :
                </label>
                <input
                    type="text"
                    id="complementAdresse"
                    value={complementAdresse}
                    onChange={(e) => onComplementAdresseChange(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Code Postal */}
            <div className="mb-4">
                <label
                    htmlFor="codePostal"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Code Postal :
                </label>
                <input
                    type="text"
                    id="codePostal"
                    value={codePostal}
                    onChange={handlePostalCodeChange}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Affichage de la ville */}
            {ville && (
                <p className="text-gray-700 text-sm font-medium mb-2">
                    Ville : {ville}
                </p>
            )}

            {/* Affichage de l'erreur */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button
                        type="button"
                        className="close"
                        onClick={clearError}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdresseForm;
