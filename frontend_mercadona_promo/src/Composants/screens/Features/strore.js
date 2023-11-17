import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Assurez-vous que le chemin d'accès est correct vers votre fichier reducers.js

const store = configureStore({
    reducer: rootReducer, // Le reducer racine combinant tous les autres reducers
    middleware: (getDefaultMiddleware) => {
        // Ajoutez des middleware personnalisés ici si nécessaire
        return getDefaultMiddleware();
    },
    // ... autres configurations de votre magasin si nécessaire ...
});

export default store;
