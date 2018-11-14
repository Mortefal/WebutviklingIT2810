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
    INVALIDATE_PRODUCT,
    //flere for show info greine
} from "../Actions/actions";

const initialState = ({
    filterArray: [],
    productData: [],
    isFavorite: false,
    })
;
function getProducts(state = {
    isFetching:false,
    didInvalidate: false,
    products: []
}, action) {
    switch (action.type) {
        case INVALIDATE_PRODUCT:
            return Object.assign({}, state, {
                didInvalidate: true
            })
        case REQUEST_PRODUCTS:
            //change this
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            });
        case RECEIVE_PRODUCTS:
            //change this
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                products: action.products,
            });
        default:
            return state;
    }
}

function getFilters(state = initialState, action){
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
        default:
            return initialState;
    }

}

function showInfo(state = initialState, action){
    switch (action.type) {
        default:
            return initialState;
    }
}

const rootReducer = combineReducers({
    getProducts,
    getFilters,
    showInfo,
});

export default rootReducer;
