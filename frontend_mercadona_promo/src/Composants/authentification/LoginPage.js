import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './useAuth';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Envoi des informations de connexion à votre endpoint Django pour vérification.
            const response = await fetch(
                'http://127.0.0.1:8000/api/v1/users/register-user/',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: new URLSearchParams({
                        email,
                        password,
                    }),
                    credentials: 'include', // Ajoutez cette ligne
                }
            );

            // Vérifiez si la requête a réussi (code de statut HTTP 200)
            if (response.ok) {
                // Authentification réussie, utilisez la fonction login du contexte d'authentification.
                login({ email, password });
                console.log('Utilisateur créé avec succès');
                // Réinitialisez les champs de formulaire après la soumission.
                setEmail('');
                setPassword('');
            } else {
                // Gérez les cas d'échec de l'authentification, par exemple, affichez un message d'erreur.
                console.error("Échec de l'authentification");
            }
        } catch (error) {
            // Gérez les erreurs liées à la requête, par exemple, affichez un message d'erreur.
            console.error("Erreur lors de l'authentification", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Connexion</h2>
            <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <div className="mb-4">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Email :
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    <label
                        htmlFor="password"
                        className="block text-gray-700 text-sm font-bold mb-2"
                    >
                        Mot de passe :
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Se connecter
                </button>

                {/* Lien vers la page d'inscription */}
                <p className="mt-4">
                    Vous n'avez pas de compte ?{' '}
                    <Link
                        to="/inscription"
                        className="text-blue-500 hover:underline"
                    >
                        Créer un compte
                    </Link>
                </p>
            </form>
        </div>
    );
}

export default LoginPage;
