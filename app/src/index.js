import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './Reducers/reducers';
import App from './Containers/App'
import configureStore from "./Store/configureStore";

const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

const initialstate = {};
const store = new configureStore(initialstate);

const myLogger = (store) => (next) => (action) => {
    console.log("Logged action" + action);
    next(action);
}
store.subscribe(() => {
    console.log("Store updated! " + store.getState().displayInfo)
})

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
