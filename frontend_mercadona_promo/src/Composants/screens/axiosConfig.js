// src/axiosConfig.js
import axios from 'axios';

// Créez une instance d'Axios avec des options de configuration par défaut
const instance = axios.create({
    baseURL: 'http://localhost:8000/', // URL de base de votre backend Django
    timeout: 5000, // Timeout en millisecondes (facultatif)
});

// Vous pouvez également définir des intercepteurs ici pour gérer les requêtes, les réponses, etc.

export default instance;
