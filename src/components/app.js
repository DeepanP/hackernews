import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { useDispatch, connect} from 'react-redux';
import NewsItem from "./newsitem";
import {getNews} from '../actions';
import { Link } from 'react-router-dom';

const NewsApp = (props)=>{
  const dispatch = useDispatch();
  const [page, setPage] = useState(props.initialPage || 1);

  const renderFeeds = ()=>{
    const newsList = props.news.map((item, index) => {
      const domain = item.url && item.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
      return <NewsItem news={item} domain={domain} index={index} key={item.objectID} />;
    });
    return newsList;
  }
  const renderGraph = () => {
    return (
      <div>
        <h1> Line Chart </h1> 
      </div>
    );
  }
  const loadPrevious = () => {
    setPage(page - 1);
  }
  const loadNext = () => {
    setPage(page + 1);
  }
  useEffect(()=>{
    dispatch(getNews(page));
  },[page]);

  return (
    <>
        {renderFeeds()}
        <div className='footer'>
        <div>
          { (page > 1) &&
          <Link to={`/${(page-1)}`} >Previous</Link>}
          <Link to={`/${(page+1)}`} >Next</Link>
        </div>
        <div>
        {renderGraph()}
        </div>
        </div> 
    </>
  );
}
const mapStateToProps = (state) => {
  return {
      news: state.news
  }
};

const loadNews = (store, {page}) => {
  return store.dispatch(getNews(page || 1));
}

NewsApp.propTypes = {
  news: PropTypes.arrayOf(PropTypes.any)
};

NewsApp.defaultProps = {
  news: []
};

export { loadNews };
export default connect(mapStateToProps, {getNews})(NewsApp);