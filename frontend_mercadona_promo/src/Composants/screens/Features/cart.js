import { createSlice } from '@reduxjs/toolkit';

// Récupérer les données du panier depuis le stockage local lors du chargement initial
const storedCartItems = localStorage.getItem('cartItems');
const initialState = {
    cartItems: storedCartItems ? JSON.parse(storedCartItems) : [],
};

// Créez un slice pour gérer le panier
export const cart = createSlice({
    name: 'cart', // Nom du slice, utilisé dans le store Redux
    initialState, // État initial du slice
    reducers: {
        createCartItem: (state, action) => {
            const { id } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (existingItem) {
                // Créez un nouvel objet pour l'article mis à jour avec une quantité mise à jour
                const updatedItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 0,
                };

                // Remplacez l'article existant dans le tableau par le nouvel objet mis à jour
                state.cartItems = state.cartItems.map((item) =>
                    item.id === id ? updatedItem : item
                );
            } else {
                // Ajoutez l'article au panier avec une quantité de 1
                state.cartItems.push({ ...action.payload, quantity: 1 });
            }
        },

        // Action pour mettre à jour la quantité d'un article dans le panier
        updateItemFromSelect: (state, action) => {
            // Trouve l'article dans le panier par son ID
            const itemToUpdate = state.cartItems.find(
                (el) => el.id === action.payload.id
            );
            // Met à jour la quantité de l'article avec la nouvelle valeur sélectionnée
            itemToUpdate.quantity = Number(action.payload.value);
        },
        // Action pour supprimer un article du panier
        deleteFromCart: (state, action) => {
            const updatedCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
            // Mettez à jour le panier avec les articles mis à jour
            state.cartItems = updatedCartItems;
            // Mettez à jour le stockage local avec les nouveaux articles du panier
            localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        },
    },
});

// Fonction d'action pour ajouter un article au panier avec gestion de l'existence de l'article dans le panier
export const addOneToCart = (productId) => (dispatch, getState) => {
    // Obtient l'état actuel du store
    const storeState = getState();

    // Vérifie si l'article est déjà dans le panier
    const isAlreadyPresent = storeState.cart.cartItems.find(
        (el) => el.id === productId
    );

    // Si l'article n'est pas déjà dans le panier, l'ajoute avec une quantité de 1
    if (!isAlreadyPresent) {
        const itemToAdd = storeState.products.items.find(
            (el) => el.id === productId
        );

        const newCartItem = {
            ...itemToAdd,
            quantity: 1,
        };

        dispatch(cart.actions.createCartItem(newCartItem));
    }
};

// Exporte les actions du slice
export const { createCartItem, updateItemFromSelect, deleteFromCart } =
    cart.actions;

// Exporte le reducer du slice
export default cart.reducer;

export const selectCartItems = (state) => state.cart.cartItems;
