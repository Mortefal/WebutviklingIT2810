import {applyMiddleware, createStore} from 'redux';
import {createLogger} from "redux-logger";
import thunkMiddleware from 'redux-thunk'
import rootReducer from "../Reducers/reducers";

const loggerMiddleware = createLogger();

export default function configureStore(initialState){
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunkMiddleware, loggerMiddleware)
    );
}
