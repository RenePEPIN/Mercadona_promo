// reducers.js
import { combineReducers } from 'redux';

import productReducer from './products';
import cartReducer from './cart';

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    // Vous pouvez ajouter d'autres réducteurs si nécessaire
});

export default rootReducer;
