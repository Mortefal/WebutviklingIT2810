import {combineReducers} from "redux";
import * as types from "../Actions/actions";

function searchServer(state = '', action) {
    switch (action.type) {
        case types.SEARCH_SERVER:
            return action.searchParam;
        default:
            return state;
    }
}

function getProducts(state = {isFetching: false, didInvalidate: false, products: []}, action) {
    console.log("Get Products");
    console.log(action.searchParam);
    switch (action.type) {
        case types.REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case types.RECEIVE_PRODUCTS:
            console.log("Recieved products");
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                products: action.products,
            })
        default:
            return state;
    }
}
function productsFromServer(state = {}, action) {
    switch (action.type) {
        case types.RECEIVE_PRODUCTS:
        case types.REQUEST_PRODUCTS:
            return Object.assign({}, state, {
                [action.products]: getProducts(state[action.products], action)
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

function getFilters(state = {
    filterQuery:[
        {key: 0, label: "Hvitvin"},{key: 1, label:"Musserende vin"},{key: 2, label:"Rødvin"},{key: 3, label:"Rosévin"},
        {key: 4, label:"Fruktvin"},{key: 5, label:"Portvin"},{key: 6, label:"Perlende vin, hvit"},{key: 7, label:"Perlende vin, rød"},
        {key: 8, label:"Perlende vin, rosé"},{key: 9, label:"Sterkvin, annen"},
        {key: 10, label:"Sherry"},{key: 11, label:"Vermut"},{key: 12, label:"Madeira"},
        {key: 13, label:"Rom"},{key: 14, label:"Bitter"},{key: 15, label:"Fruktbrennevin"},{key: 16, label:"Likør"},{key: 17, label:"Vodka"},
        {key: 18, label:"Sake"},{key: 19, label:"Sider"},{key: 20, label:"Lys ale"},{key: 21, label:"Klosterstil"},
        {key: 22, label:"Hveteøl"},{key: 23, label:"Surøl"},
        {key: 24, label:"Scotch ale"},{key: 25, label:"Alkoholfri vin"},
        ],
    filterParam: [],
    filterArray: [],
}, action){
    switch (action.type) {
        case types.REMOVE_FILTER:
            return{
                ... state,
                filterParam: [],
            };
        case types.ADD_FILTER:
            return{
                ...state,
                filterParam: state
            }
        case types.GET_ALL_FILTERS:
            return{
                ...state,
                filterArray: state.filterArray
            }
        default:
            return state;
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
const rootReducer = combineReducers({
    productsFromServer,
    searchServer,
    getFilters,
    displayInfo,
    getQuery,

});

export default rootReducer;
