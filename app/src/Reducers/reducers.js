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
            //change this
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case types.RECEIVE_PRODUCTS:
            //change this
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

function getFilters(state = {
    filterQuery:[
        {key: 0, label: "Hvitvin"},{key: 1, label:"Musserende vin"},{key: 2, label:"Rødvin"},{key: 3, label:"Rosévin"},
        {key: 4, label:"Fruktvin"},{key: 5, label:"Portvin"},{key: 6, label:"Perlende vin, hvit"},{key: 7, label:"Perlende vin, rød"},
        {key: 8, label:"Perlende vin, rosé"},{key: 9, label:"Sterkvin, annen"},
        {key: 10, label:"Sherry"},{key: 11, label:"Vermut"},{key: 12, label:"Madeira"},
        /* {key: 0, label: "Aromatisert vin"},
        {key: 0, label: "Champagne, brut"},
        {key: 0, label: "Musserende vin, rosé"},
        {key: 0, label: "Champagne, rosé"},
        {key: 0, label: "Champagne extra brut"},
        {key: 0, label: "Champagne, annen"},
        {key: 0, label: "Champagne, sec"},
        {key: 0, label: "Whisky"},
        {key: 0, label: "Akevitt"},
        {key: 0, label: "Gin"},
        {key: 0, label: "Druebrennevin"},*/
        {key: 13, label:"Rom"},{key: 14, label:"Bitter"},{key: 15, label:"Fruktbrennevin"},{key: 16, label:"Likør"},{key: 17, label:"Vodka"},
        /*{key: 0, label: "Brennevin, annet"},
        {key: 0, label: "Brennevin, nøytralt<37.5%"},
        {key: 0, label: "Genever"},*/
        {key: 18, label:"Sake"},{key: 19, label:"Sider"},{key: 20, label:"Lys ale"},{key: 21, label:"Klosterstil"},
        /*{key: 0, label: "India pale ale"},
        {key: 0, label: "Brown ale"},
        {key: 0, label: "Pale ale"},
        {key: 0, label: "Spesial"},*/
        {key: 22, label:"Hveteøl"},{key: 23, label:"Surøl"},
        /*{key: 0, label: "Porter & Stout"},
        {key: 0, label: "Saison farmhouse ale"},
        {key: 0, label: "Mørk lager"},
        {key: 0, label: "Barley wine"},
        {key: 0, label: "Red/amber"},*/
        {key: 24, label:"Scotch ale"},{key: 25, label:"Alkoholfri vin"},
        /*{key: 0, label: "Alkoholfri most"},
        {key: 0, label: "Alkoholfri musserende drikk"},
        {key: 0, label: "Alkoholfritt øl"},
        {key: 0, label: "Alkoholfritt, øvrig"},
        {key: 0, label: "Alkoholfri leskedrikk"},*/
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
