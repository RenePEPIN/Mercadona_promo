import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Importez le Provider de react-redux
import store from './Composants/screens/Features/configRedux'; // Importez votre fichier configRedux.js
import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';

import './style/main.css';

import App from './App'; // Assurez-vous d'importer le composant racine correctement

const root = document.getElementById('root');
const rootDOM = createRoot(root);

rootDOM.render(
    <Provider store={store}>
        {' '}
        {/* Enveloppez votre application avec le Provider */}
        <App />
    </Provider>
);
