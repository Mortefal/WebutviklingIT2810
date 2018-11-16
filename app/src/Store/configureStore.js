import {applyMiddleware, createStore} from 'redux';
import {createLogger} from "redux-logger";
import thunkMiddleware from 'redux-thunk'
import rootReducer from "../Reducers/reducers";
import { composeWithDevTools } from 'redux-devtools-extension';

/*
*   STORE:
*   This is how we set up our store and applied for instance the logger so we could see the store values change when they were supposed to.
*   This was nice for debugging.
*/

const loggerMiddleware = createLogger();
const initialState = {};
export default function configureStore(){

    return createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(thunkMiddleware, loggerMiddleware),
        )
    );
}
