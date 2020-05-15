import { combineReducers } from 'redux';

import { GET_NEWS } from '../actions';

export default combineReducers({
    news: (state=[], actions) => {
        switch(actions.type) {
            case GET_NEWS:
                return actions.payload
            default:
                return state;
        }
    }
})