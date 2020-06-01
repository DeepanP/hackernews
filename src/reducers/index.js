import { combineReducers } from 'redux';

import { GET_NEWS, CURRENT_PAGE } from '../actions';

export default combineReducers({
    pages: (state={ current: 1 },actions)=>{
        switch(actions.type){
            case CURRENT_PAGE:
                return {...state, ...actions.payload }
            default:
                return state
        }
    },
    news: (state=[], actions) => {
        switch(actions.type) {
            case GET_NEWS:
                return [...actions.payload]
            default:
                return state;
        }
    }
})