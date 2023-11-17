import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

export const products = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProducts: (state, action) => {
            state.items = action.payload;
        },
        setProductPicked: (state, action) => {
            const { id, picked } = action.payload;
            const product = state.items.find((el) => el.id === id);
            if (product) {
                product.picked = picked;
            }
        },
    },
});

export function getProductsList() {
    return function (dispatch) {
        fetch('/data/inventory.json')
            .then((response) => response.json())
            .then((data) => dispatch(addProducts(data.products)));
    };
}

export const { addProducts, setProductPicked } = products.actions;
export default products.reducer;
