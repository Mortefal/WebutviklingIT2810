export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const SELECT_FILTERS = 'SELECT_FILTERS';
export const REQUEST_FAVORITES = 'REQUEST_FAVORITES';
export const RECEIVE_FAVORITES = 'RECEIVE_FAVORITES';
export const ADD_FAVORITES = 'ADD_FAVORITES';
export const REMOVE_FAVORITES = 'REMOVE_FAVORITES';

export const selectProducts = () => ({
    type: RECEIVE_PRODUCTS,
    product
});

export const requestProducts = () => ({
    type: REQUEST_PRODUCTS
})
