import React from "react";
//import ReactDOM from "react-dom";
import ReactDOM from "react-dom/client";
import {Provider} from "react-redux";
import { configureStore } from '@reduxjs/toolkit'
import {applyMiddleware, compose, createStore} from "redux";
import thunk from "redux-thunk";

import App from "./App";

import {reducer} from "./reducer/reducer";
import {api} from "./api";
import {BrowserRouter} from "react-router-dom";
import history from "./history";

// const store = createStore(reducer, compose(
//     applyMiddleware(thunk.withExtraArgument(api)),
//     window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f)
// );

const store = configureStore({
    reducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: { api }
            }
        })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
);