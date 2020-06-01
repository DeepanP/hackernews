import axios from 'axios';

export const GET_NEWS= 'getNews';
export const CURRENT_PAGE= 'currentPage';
export const getNews = (page) => async dispatch =>  {

    const url =  'https://hn.algolia.com/api/v1/search?page='+ (page ? page : 1);
    const res = await axios.get(url);
        dispatch({
            type: GET_NEWS,
            payload: res.data.hits ? res.data.hits : []
        });
};
