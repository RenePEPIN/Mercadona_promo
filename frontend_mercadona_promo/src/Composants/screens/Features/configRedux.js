import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

// Importez vos réducteurs
import productReducer from './products'; // Assurez-vous du chemin d'accès correct vers votre fichier productReducer.js
import cartReducer from './cart'; // Assurez-vous du chemin d'accès correct vers votre fichier cartReducer.js

// Combinez vos réducteurs en un seul rootReducer
const rootReducer = combineReducers({
    products: productReducer, // Le réducteur pour les produits
    cart: cartReducer, // Le réducteur pour le panier
    // ...ajoutez d'autres réducteurs si nécessaire
});

// Configurez votre store avec le rootReducer
const store = configureStore({
    reducer: rootReducer, // Utilisez le rootReducer comme réducteur principal
    // ... ajoutez d'autres configurations de votre magasin si nécessaire ...
});

// Exportez le store configuré
export default store;
