import {combineReducers} from "redux";

const productData = true;
const filters = true;

const rootReducer = combineReducers({
    productData,
    filters
});

export default rootReducer;
