import {combineReducers} from "redux";
import * as types from "../Actions/actions";
import configureStore from "../Store/configureStore";


const initialState = ({
    filterArray: [],
    productData: [],
    isFavorite: false,
    query: ''
    })
;

function getProducts(state = {
    products: [],
    query: ''
}, action) {
    console.log("Get Products");
    console.log(action);
    switch (action.type) {
        case types.REQUEST_PRODUCTS:
            //change this
            return Object.assign({}, state, {
                isFetching: true,
            });
        case types.RECEIVE_PRODUCTS:
            //change this
            console.log("Recieved products");
            return Object.assign({}, state, {
                isFetching: false,
                products: action.products,
            });
        default:
            return state;
    }
}


function getQuery(state = {}, action) {
    switch (action.type) {
        case types.GET_QUERY:
            console.log(action.text)
            return Object.assign({}, state, {
                ... state,
                query: action.text,
            });
        default:
            return state;
    }
}
/*
export function consolelog(){
    console.log(configureStore().getState())
}*/

function getFilters(state = initialState, action){
    switch (action.type) {
        case types.REQUEST_FILTERS:
            //change this
            return state;
        case types.RECEIVE_FILTERS:
            //change this
            return state;
        case types.REMOVE_FILTER:
            //change this
            return state;
        case types.ADD_FILTER:
            //change this
            return state;
        case types.GET_ALL_FILTERS:
            //change this
            return state;
        case types.GET_SELECTED_FILTER:
            //change this
            return state;
        default:
            return initialState;
    }

}

function showInfo(state = {
    openModal: false
}, action){
    switch (action.type) {
        case types.SHOW_MODAL:
            return Object.assign({}, state, {
            openModal: true
        })
        case types.HIDE_MODAL:
            return Object.assign({}, state, {
                openModal: false
            })
        default:
            return initialState;
    }
}

const rootReducer = combineReducers({
    getProducts,
    getFilters,
    showInfo,
    getQuery,
});

export default rootReducer;
