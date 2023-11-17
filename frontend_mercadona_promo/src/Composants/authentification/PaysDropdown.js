import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PaysDropdown({ paysListe, selectedPays, setSelectedPays }) {
    const [error, setError] = useState('');

    useEffect(() => {
        if (!paysListe) {
            // Fetch paysListe if not already fetched
            axios
                .get('https://restcountries.com/v3.1/all')
                .then((response) => {
                    if (Array.isArray(response.data)) {
                        setSelectedPays(response.data[0].name.common);
                    } else {
                        setError(
                            "La liste des pays n'est pas un tableau valide."
                        );
                    }
                })
                .catch((error) => {
                    setError(
                        `Erreur lors de la récupération des pays: ${error.message}`
                    );
                    setSelectedPays(''); // Mettez à jour le pays sélectionné en cas d'erreur
                });
        }
    }, [paysListe, setSelectedPays]);

    if (!paysListe) {
        // Render a loading state or return null while paysListe is being fetched
        return <div>Chargement des pays...</div>;
    }

    return (
        <div>
            <label htmlFor="pays" className="">
                Pays :
            </label>
            <select
                id="pays"
                value={selectedPays}
                onChange={(e) => setSelectedPays(e.target.value)}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                aria-live="assertive" // Annonce les erreurs aux utilisateurs de lecteurs d'écran
            >
                <option value="">Sélectionnez votre pays</option>
                {paysListe.map((pays) => (
                    <option key={pays.name.common} value={pays.name.common}>
                        {pays.name.common}
                    </option>
                ))}
            </select>

            {/* Affichage de l'erreur */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                    <button
                        type="button"
                        className="close"
                        onClick={() => setError('')}
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            )}
        </div>
    );
}

export default PaysDropdown;
