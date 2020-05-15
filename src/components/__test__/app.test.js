import React from 'react';
import { hydrate } from "react-dom";
import { act } from 'react-dom/test-utils';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../../reducers';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import NewsApp from '../app';
import data from './data.json';

const initialState = {
    news: data
}
const store = createStore(reducers, initialState, applyMiddleware(thunk));
let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
  act(() => {
    hydrate( 
        <Provider store={store}>
            <NewsApp/>
        </Provider>,
        container
    );
  });
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('Render news', () => {
  const news = container.querySelectorAll('.wrapper');
  expect(news.length).toEqual(2);
});

it('Upvote news on click of icon button', () => {
    const upvoteIcon = container.querySelector('.upvote-action');
    const upvoteCount = container.querySelector('.upvotes');
    act(() => {
        upvoteIcon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(parseInt(upvoteCount.textContent)).toEqual(data[0].points+1);

})
it('Hide news on click of button', () => {
    const upvoteIcon = container.querySelector('.hide-text');
    act(() => {
        upvoteIcon.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    const feeds = container.querySelectorAll('.wrapper');
    expect(parseInt(feeds.length)).toEqual(1);

})