import fetch from 'cross-fetch'
import configureStore from "../Store/configureStore";
import {applyMiddleware as dispatch} from "redux";
import {productsFromServer} from "../Reducers/reducers";

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS';
export const SEARCH_SERVER = 'SEARCH_SERVER';
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

export function searchServer(products) {
    return{
        type: SEARCH_SERVER,
        products
    }
}


function requestProducts(searchParam) {
    console.log("2.3")
    console.log("Searchparam: " + searchParam);
    return{
        type: 'REQUEST_PRODUCTS',
        searchParam
    }
}
function fetchProducts(searchParam) {
    console.log("2")
    console.log("Fetchproducts params: " + searchParam);
    return dispatch => {
        dispatch(requestProducts(searchParam))
        return fetch(`http://it2810-15.idi.ntnu.no:3000/beverages/search?${searchParam}`)
            .then(response => response.json())
            .then(json => dispatch(receiveProducts(searchParam, json)))
    }
}

function receiveProducts(searchParam, json) {
    console.log("receivedData: " + searchParam)
    console.log(json);
    return {
        type: 'RECEIVE_PRODUCTS',
        searchParam,
        products: json
    }
}

export function getQuery(query) {
    console.log("1")
    console.log(query)
    /*return (dispatch) =>{
        //dispatch(fetchProducts(query));*/
        return({
            type: 'GET_QUERY',
            text: query
        })
    //}

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



function requestFilters() {
    return {
        type: 'REQUEST_FILTERS',
    }
}

function receiveFilters(filterList,json) {
    return {
        type: 'RECEIVE_FILTERS',
        filterQuery: filterList,
        filterArray: json
    }
}

export function fetchAllFilters() {
    return dispatch => {
        dispatch(requestFilters());
        fetch(`http://it2810-15.idi.ntnu.no:3000/beverages/types`)
            .then(response => response.json())
            .then(json => {
                console.log(json[0].subCategories);
                console.log(json[0].subCategories[3]);
                let filterList = [];
                for (let j in json.length){
                    for (let i in json[j].subCategories.length){
                        try{
                            console.log(i);
                            filterList.push(...{
                                'key': i,
                                'label': json[j].subCategories[i]

                            })
                        } catch (e) {
                            console.log(e);
                        }
                    }
                }
        dispatch(addAllFilters(filterList))
        console.log(filterList);
        dispatch(receiveFilters(filterList, json))
            })

        }
    }

export function addFilter(filterName) {
    return {
        type: 'ADD_FILTER',
        filterParam: filterName,

    }
}
export function removeFilter() {
        return {
            type: 'REMOVE_FILTER',
            filterParam: []
        }
    }
export function addAllFilters(list){
    return {
        type: 'GET_ALL_FILTERS',
        filterArray: list
    }
}

function shouldFetchProducts(state, param) {
    const products = state.productsFromServer([param]);
    if (!products) {
        return true
    } else if (products.isFetching) {
        return false
    } else {
        return products.didInvalidate
    }
}
export function fetchProductsIfNeeded(searchParam) {
    return (dispatch, getState) => {
        if (shouldFetchProducts(getState(), searchParam)) {
            return dispatch(fetchProducts(searchParam))
        }
    }
}
