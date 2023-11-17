import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

// Créez un contexte d'authentification
const AuthContext = createContext();

// Créez un composant de contexte d'authentification
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // L'état de l'utilisateur authentifié

    // Fonction d'inscription
    const registerUser = async (formData) => {
        try {
            console.log("Envoi de la requête d'inscription...");
            const response = await axios.post(
                'http://127.0.0.1:8000/api/v1/users/register-user/',
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                    timeout: 70000,
                }
            );
            console.log('Réponse du backend :', response.data);
            setUser(response.data);
            return response.data; // Ajout cette ligne pour retourner les données au besoin
        } catch (error) {
            console.error("Erreur lors de l'inscription :", error);
            throw error; // Lancez l'erreur pour qu'elle puisse être gérée à l'extérieur de cette fonction
        }
    };

    // Mettez en place le contexte avec les valeurs et les fonctions nécessaires
    const contextValue = {
        user,
        registerUser,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

// Créez un hook pour utiliser le contexte d'authentification
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error(
            "useAuth doit être utilisé à l'intérieur d'AuthProvider"
        );
    }
    return context;
}
