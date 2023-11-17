import React, { useState } from 'react';
import AdresseForm from './AdresseForm';
import AuthForm from './AuthForm';
import PaysDropdown from './PaysDropdown';
import { useAuth } from './useAuth';

function InscriptionPage() {
    const { registerUser } = useAuth();

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Informations personnelles
    const [civilite, setCivilite] = useState('');
    const [nom_utilisateur, setUsername] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // Informations d'adresse
    const [adresse, setAdresse] = useState('');
    const [codePostal, setCodePostal] = useState('');
    const [complementAdresse, setComplementAdresse] = useState('');

    // Pays
    const [selectedPays, setSelectedPays] = useState('');

    const clearError = () => {
        setError(null);
    };

    const isValidEmail = (email) => {
        // Expression régulière pour la validation d'e-mail simple
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Gestion des champs du formulaire d'authentification
    const handleEmailChange = (newEmail) => {
        setEmail(newEmail);
    };

    const handlePasswordChange = (newPassword) => {
        setPassword(newPassword);
    };

    const handleConfirmPasswordChange = (newConfirmPassword) => {
        setConfirmPassword(newConfirmPassword);
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            // Validation côté client
            if (
                !civilite ||
                !nom_utilisateur ||
                !nom ||
                !prenom ||
                !email ||
                !password ||
                !codePostal ||
                !selectedPays
            ) {
                setError('Veuillez remplir tous les champs du formulaire.');
                return;
            }

            // Validation d'e-mail
            if (!isValidEmail(email)) {
                setError('Veuillez entrer une adresse e-mail valide.');
                return;
            }

            // Validation du mot de passe et de sa confirmation
            if (password !== confirmPassword) {
                setError('Les mots de passe ne correspondent pas.');
                return;
            }

            // Autres validations selon vos besoins (par exemple, mot de passe fort, etc.)

            const formData = {
                civilite,
                nom_utilisateur,
                nom,
                prenom,
                email,
                password,
                codePostal,
                complementAdresse,
                selectedPays,
            };

            console.log(
                "Envoi de la requête d'inscription depuis InscriptionPage..."
            );
            console.log('Données du formulaire soumises :', formData);

            // Appel de la fonction registerUser pour effectuer l'inscription
            await registerUser(formData);
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            setError(
                error.response?.data?.error ||
                    "Erreur lors de l'inscription. Veuillez réessayer plus tard."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>

                <form onSubmit={handleSubmit} className="mt-4">
                    {/* ... (autres champs de formulaire) */}

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

                    <AuthForm
                        civilite={civilite}
                        onCiviliteChange={setCivilite}
                        nom_utilisateur={nom_utilisateur}
                        onUsernameChange={setUsername}
                        nom={nom}
                        onNomChange={setNom}
                        prenom={prenom}
                        onPrenomChange={setPrenom}
                        email={email}
                        onEmailChange={handleEmailChange}
                        password={password}
                        onPasswordChange={handlePasswordChange}
                        confirmPassword={confirmPassword}
                        onConfirmPasswordChange={handleConfirmPasswordChange}
                        onSubmit={handleSubmit}
                        error={error}
                        clearError={clearError}
                        loading={loading}
                    />

                    <PaysDropdown
                        selectedPays={selectedPays}
                        setSelectedPays={setSelectedPays}
                    />

                    <AdresseForm
                        adresse={adresse}
                        codePostal={codePostal}
                        complementAdresse={complementAdresse}
                        onAdresseChange={setAdresse}
                        onCodePostalChange={setCodePostal}
                        onComplementAdresseChange={setComplementAdresse}
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Créer un compte
                    </button>
                </form>
            </div>
        </div>
    );
}

export default InscriptionPage;
