import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Composants/Header';
import Footer from './Composants/Footer';
import Catalogue from './Composants/screens/Catalogue';
import PromotionPage from './Composants/screens/PromotionPage';
import FloatingCartButton from './Composants/screens/FloatingCartButton';
import LoginPage from './Composants/authentification/LoginPage';
import InscriptionPage from './Composants/authentification/InscriptionPage';
import './style/main.css';
import { AuthProvider } from './Composants/authentification/useAuth';

function App() {
    const [panier, setPanier] = useState([]);

    const ajouterAuPanier = (produit) => {
        const produitExistant = panier.find((item) => item.id === produit.id);
        if (produitExistant) {
            setPanier(
                panier.map((item) =>
                    item.id === produit.id
                        ? { ...item, quantite: item.quantite + 1 }
                        : item
                )
            );
        } else {
            setPanier([...panier, { ...produit, quantite: 1 }]);
        }
    };

    console.log('Rendering App Component');

    return (
        <Router>
            <AuthProvider>
                <Header />
                <div className="container mx-auto p-4">
                    <Routes>
                        <Route
                            path="/Composants/authentification/LoginPage"
                            element={<LoginPage />}
                        />
                        <Route
                            path="/inscription"
                            element={<InscriptionPage />}
                        />

                        <Route
                            path="/"
                            element={
                                <>
                                    <FloatingCartButton panier={panier} />
                                    <Catalogue
                                        ajouterAuPanier={ajouterAuPanier}
                                    />
                                    {/* Composant FloatingCartButton rendu à l'intérieur du composant Catalogue */}
                                </>
                            }
                        />
                        {/* Route pour la page de promotions */}
                        <Route
                            path="/PromotionPage"
                            element={
                                <>
                                    <FloatingCartButton panier={panier} />
                                    <PromotionPage
                                        ajouterAuPanier={ajouterAuPanier}
                                    />
                                    {/* Composant FloatingCartButton rendu à l'intérieur du composant Catalogue */}
                                </>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
