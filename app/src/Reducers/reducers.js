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
    query: '',
}, action) {
    //console.log("Get Products");
    //console.log(action);
    switch (action.type) {
        case types.REQUEST_PRODUCTS:
            //change this
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                query: ""
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
<<<<<<< HEAD
    console.log(configureStore().subscribe(() => {
        console.log(configureStore().getState().query)
    }))
    consolelog()
}
=======
    console.log(configureStore().getState())
}*/

function getFilters(state = initialState, action){
    switch (action.type) {
        case types.REQUEST_FILTERS:
            //change this
            return state;
        case types.RECEIVE_FILTERS:
            return Object.assign({}, state, {
                ... state,
                filterArray: action.filter,
            });
        case types.REMOVE_FILTER:
            return Object.assign({}, state, {
                ... state,
                filter: "",
            });
        case types.ADD_FILTER:
            return Object.assign({}, state, {
                ... state,
                filter: action.filter,
            });
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

function displayInfo(state = {
    openModal: false,
    favorite: false,
}, action){
    switch (action.type) {
        case types.SHOW_MODAL:
            return  {
                ...state,
                openModal: true
        };
        case types.HIDE_MODAL:
            return {
                ...state,
                openModal: false,
            };
        case types.SET_FAVORITE:
            return{
                ...state,
                favorite: !state.favorite
            };
        default:
            return state;
    }
}
/*
function setFavorite(state = {favorite: false}, action) {
    switch (action.type) {
        case types.ADD_FAVORITE:
            return {
                ...state,
                favorite: true
            };
        case types.REMOVE_FAVORITE:
            return {
                ...state,
                favorite: false
            };
        default:
            return{
                state
            }
    }

}
*/
const rootReducer = combineReducers({
    getProducts,
    getFilters,
    displayInfo,
    getQuery,

});

export default rootReducer;
