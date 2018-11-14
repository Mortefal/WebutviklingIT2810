import fetch from 'cross-fetch'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';

export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const GET_ALL_FILTERS = 'GET_ALL_FILTERS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const GET_SELECTED_FILTERS = 'GET_SELECTED_FILTERS';

function requestProducts(beverages) {
    return{
        type: REQUEST_PRODUCTS,
        beverages
    }
}

function receiveProducts(beverages, json) {
    return{
        type: RECEIVE_PRODUCTS,
        beverages,
        products: json.data.children.map(child => child.data)
    }
}
function fetchProducts(beverages){
    return dispatch => {
        dispatch(requestProducts(beverages))
        return fetch(`http://localhost:3000/beverages/search${beverages}`)
            .then(response => response.json())
            .then(json => dispatch(receiveProducts(beverages, json)))
    }
}
function requestFilters(filters) {
    return{
        type: REQUEST_FILTERS,
        filters
    }
};
function receiveFilters(filters, json) {
    return{
        type: RECEIVE_FILTERS,
        filters,
        filter: json.data.children.map(child => child.data)
    }
}
function fetchAllFilters(filters) {
    return dispatch = {
        dispatch(requestFilters(filters));
        return fetch(`http://localhost:3000/types')
    }
}
