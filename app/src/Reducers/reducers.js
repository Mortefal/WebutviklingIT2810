import {combineReducers} from "redux";
import {
    REQUEST_PRODUCTS,
    RECEIVE_PRODUCTS,
    REQUEST_FILTERS,
    RECEIVE_FILTERS,
    REMOVE_FILTER,
    ADD_FILTER,
    GET_ALL_FILTERS,
    GET_SELECTED_FILTER,
    //flere for show info greine
} from "../Actions/actions";


function getProducts(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PRODUCTS:
            //change this
            return state;
        case RECEIVE_PRODUCTS:
            //change this
            return state;
        default:
            return state
    }
}

function getFilters(state, action){
    switch (action.type) {
        case REQUEST_FILTERS:
            //change this
            return state;
        case RECEIVE_FILTERS:
            //change this
            return state;
        case REMOVE_FILTER:
            //change this
            return state;
        case ADD_FILTER:
            //change this
            return state;
        case GET_ALL_FILTERS:
            //change this
            return state;
        case GET_SELECTED_FILTER:
            //change this
            return state;
    }

}

function showInfo(){

}

const rootReducer = combineReducers({
    getProducts,
    getFilters,
});

export default rootReducer;
