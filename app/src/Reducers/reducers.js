import {combineReducers} from "redux";

function getProducts(state = initialState, action) {
    switch (action.type) {
        case REQUEST_PRODUCTS:
            return
    }
}

function showInfo(){

}
const productData = true;
const filters = true;

const rootReducer = combineReducers({
    productData,
    filters
});

export default rootReducer;
