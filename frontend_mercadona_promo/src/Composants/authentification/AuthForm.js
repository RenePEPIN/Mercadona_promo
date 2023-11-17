// AuthForm.js
import React from 'react';

function AuthForm({
    civilite,
    nom_utilisateur,
    nom,
    prenom,
    email,
    password,
    confirmPassword,
    onCiviliteChange,
    onUsernameChange,
    onNomChange,
    onPrenomChange,
    onEmailChange,
    onPasswordChange,
    onConfirmPasswordChange,
}) {
    const handleEmailChange = (newEmail) => {
        // Logique pour gérer le changement d'e-mail
        onEmailChange(newEmail);
    };

    // appel de ta methode d'ajout

    return (
        <div>
            {/* ... Autres champs de formulaire ... */}
            {/* Civilité */}
            <div className="mb-4">
                <label
                    htmlFor="civilite"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Civilité :
                </label>
                <select
                    id="civilite"
                    value={civilite}
                    onChange={(e) => onCiviliteChange(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <option value="">Choisissez votre civilité</option>
                    <option value="M.">Madame</option>
                    <option value="Mme.">Monsieur</option>
                </select>
            </div>
            {/* NomUtilisateur */}
            <div className="mb-4">
                <label
                    htmlFor="nom"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    nom_utilisateur:
                </label>
                <input
                    type="text"
                    id="nom_utilisateur"
                    value={nom_utilisateur}
                    onChange={(e) => onUsernameChange(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            {/* Nom */}
            <div className="mb-4">
                <label
                    htmlFor="nom"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Nom :
                </label>
                <input
                    type="text"
                    id="nom"
                    value={nom}
                    onChange={(e) => onNomChange(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Prénom */}
            <div className="mb-4">
                <label
                    htmlFor="prenom"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Prénom :
                </label>
                <input
                    type="text"
                    id="prenom"
                    value={prenom}
                    onChange={(e) => onPrenomChange(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Email */}
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
                    onChange={(e) => handleEmailChange(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Mot de passe */}
            <div className="mb-4">
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
                    onChange={(e) => {
                        console.log('Changing password:', e.target.value);
                        onPasswordChange(e.target.value);
                    }}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Confirmation du Mot de passe */}
            <div className="mb-6">
                <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700 text-sm font-bold mb-2"
                >
                    Confirmer le mot de passe :
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => onConfirmPasswordChange(e.target.value)}
                    required
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* ... Autres champs de formulaire ... */}
        </div>
    );
}

export default AuthForm;
