import "@babel/polyfill";
import React from "react";
import { hydrate } from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Routes from './routes';

const store = createStore(reducers, (window.INITIAL_NEWS || []), applyMiddleware(thunk));

hydrate(
    <Provider store={store}>
        <BrowserRouter>
            {renderRoutes(Routes)}
        </BrowserRouter>
    </Provider>
, document.getElementById("bootstrap"));