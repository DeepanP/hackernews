import "@babel/polyfill";
import React from "react";
import { hydrate } from "react-dom";
import NewssApp from './components/app';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers, (window.INITIAL_NEWS || []), applyMiddleware(thunk));

hydrate(
    <Provider store={store}>
        <NewssApp/>
    </Provider>
, document.getElementById("bootstrap"));