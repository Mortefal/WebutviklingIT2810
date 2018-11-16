import fetch from 'cross-fetch'
import configureStore from "../Store/configureStore";

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const GET_QUERY = 'GET_QUERY';
export const REQUEST_FILTERS = 'REQUEST_FILTERS';
export const RECEIVE_FILTERS = 'RECEIVE_FILTERS';
export const GET_ALL_FILTERS = 'GET_ALL_FILTERS';
export const ADD_FILTER = 'ADD_FILTER';
export const REMOVE_FILTER = 'REMOVE_FILTER';
export const GET_SELECTED_FILTER = 'GET_SELECTED_FILTER';
export const INVALIDATE_PRODUCT = 'INVALIDATE_PRODUCT';
export const SHOW_MODAL = 'SHOW_MODAL';
export const HIDE_MODAL = 'HIDE_MODAL';
export const SET_FAVORITE = 'SET_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

//const store = configureStore();


function requestProducts(beverages) {
    console.log("2.3")
    return{
        type: 'REQUEST_PRODUCTS',
        beverages
    }
}

export function getQuery(query) {
    console.log("1")
    console.log(query)
    return (dispatch) =>{
        dispatch(fetchProducts(query));
        return({
            type: 'GET_QUERY',
            text: query
        })
    }

}
export function showInfo(bools){
    return{
        type: 'SHOW_MODAL',
        bools
    }
}
export function setFavorite(bools) {
    return{
        type: 'SET_FAVORITE',
        bools
    }
}
export function removeFavorite(bools) {
    return{
        type: 'REMOVE_FAVORITE',
        bools
    }
}
export function hideInfo(bools){
    return{
        type: 'HIDE_MODAL',
        bools
    }
}
export function fetchAllFiltersIfNeeded(filters) {
    return (dispatch, getState) => {
        if (shouldFetchFilters(getState(), filters)) {
            return dispatch(fetchAllFilters(filters));
        }
    }
}

function fetchProducts(beverages){
    console.log("2")
    requestProducts(beverages);
    fetch(`http://it2810-15.idi.ntnu.no:3000/beverages/search?productType=Rødvin`)
        .then(response => response.json())
        .then(json => receiveProducts(beverages, json))

}
    function receiveProducts(beverages, json) {
    console.log(json);
        return {
            type: 'RECEIVE_PRODUCTS',
            beverages,
            products: json
        }
    }

    function requestFilters(filters) {
        return {
            type: 'REQUEST_FILTERS',
            filters
        }
    }

    function receiveFilters(filters, json) {
        return {
            type: 'RECEIVE_FILTERS',
            filters,
            filter: json.data.children.map(child => child.data)
        }
    }

function fetchAllFilters(filters) {
    return dispatch => {
        dispatch(requestFilters(filters));
        return fetch(`http://it2810-15.idi.ntnu.no:3000/beverages/types`)
            .then(response => response.json())
            .then(json => {
                let filterList = [];
                for (var i in json.length){
                    try {
                        filterList.push({
                            'key': i,
                            'label': json[i].mainCategory
                        })
                    } catch (e) {
                        console.log(e);
                    }
                }
                dispatch(receiveFilters(filters, json))
            })

        }
    }

    export function addFilter(key, filterName) {
        return {
            type: 'ADD_FILTER',
            key: key,
            filter: filterName
        }
    }
    export function removeFilter(filter) {
        return {
            type: 'REMOVE_FILTER',
            filter: filter
        }
    }

    function getSelectedFilter() {
        return {
            type: 'GET_SELECTED_FILTER',
        }
    }

    function shouldFetchFilters(state, filters) {
        const filter = state.filterArray[filters];
        if (!filter) {
            return true
        } else if (filter.isFetching) {
            return false
        } else {
            return filter.didInvalidate
        }
    }
