import {applyMiddleware, createStore} from 'redux';
import {createLogger} from "redux-logger";
import thunkMiddleware from 'redux-thunk'
import rootReducer from "../Reducers/reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

const loggerMiddleware = createLogger();
const initialState = {}
export default function configureStore(){

    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware),
        )
    );
}
