import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import Panier from './Panier';

import ShoppingCartIcon from './assets/shopping-cart.svg';

// ...autres imports et code de votre application

export default function FloatingCartButton() {
    const [showModal, setShowModal] = useState(false);

    const cart = useSelector((state) => state.cart);

    const handleButtonClick = () => {
        setShowModal(!showModal);
    };

    return (
        <>
            <button
                onClick={handleButtonClick}
                className="fixed py-2 px-4 top-30 right-5 bg-slate-100 rounded flex justify-center items-center"
            >
                {/* Affichez votre icône de panier ici */}
                <img
                    className="w-6 h-6 mr-2"
                    src={ShoppingCartIcon}
                    alt="Shopping Cart"
                />
                <span className="text-lg font-semibold">
                    View your cart : {cart.cartItems.length}
                </span>
            </button>

            {showModal &&
                createPortal(
                    <Panier onClose={() => setShowModal(false)} />,
                    document.body
                )}
        </>
    );
}
