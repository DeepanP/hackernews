import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { useDispatch, connect} from 'react-redux';
import NewsItem from "./newsitem";
import {getNews} from '../actions';

const NewsApp = (props)=>{
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const renderFeeds = ()=>{
    const newsList = props.news.map((item, index) => {
      const domain = item.url && item.url.replace('http://','').replace('https://','').split(/[/?#]/)[0];
      return <NewsItem news={item} domain={domain} index={index} key={item.objectID} />;
    });
    return newsList;
  }
  const loadMore = ()=>{
    setPage(page+1);
  }
  useEffect(()=>{
    dispatch(getNews(page));
  },[page]);

  return (
    <>
        {renderFeeds()}
        <div className='footer'><button className='btn-more' onClick={loadMore}>more</button></div> 
    </>
  );
}
const mapStateToProps = (state) => {
  return {
      news: state.news
  }
};

NewsApp.propTypes = {
  news: PropTypes.arrayOf(PropTypes.any)
};

NewsApp.defaultProps = {
  news: []
};

export default connect(mapStateToProps, {getNews})(NewsApp);