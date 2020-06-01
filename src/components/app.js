import React, {useState, useEffect} from "react";
import PropTypes from 'prop-types';
import { useDispatch, connect} from 'react-redux';
import NewsItem from "./newsitem";
import {getNews} from '../actions';
import { Link, useRouteMatch } from 'react-router-dom';
import { Chart } from 'react-charts';

const NewsApp = (props)=>{
  const dispatch = useDispatch();
  
  const match = useRouteMatch('/news/:page');
  const [pageNum, setPageNum] = useState(props.pages && props.pages.current || 1);
  const [chart, setChart] = useState();

  useEffect(()=>{
    setPageNum(match.params.page);
  },[match.params.page])

  useEffect(()=>{
    dispatch(getNews(pageNum));
  },[pageNum]);


  const data = React.useMemo(
    () => 
    {
      const plot = props.news.map((item, index = 1) => {
        return [index, item.points]
      });
      return [
      {
        label: 'Series 1',
        data: plot
      }
    ];
  },
    [props.news]
  );
 
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left', stacked: true }
    ],
    []
  );

  useEffect(()=>{
    setChart(<Chart data={data} axes={axes} />);
  },[data,axes]);

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
        <h2> Line Chart </h2>
        <div className='chart-container'>
          {chart}
        </div>
      </div>
    );
  }

  return (
    <>
        {renderFeeds()}
        <div className='footer'>
        <div className='links'>
          { (pageNum > 1) &&
          <Link to={`/news/${(Number(pageNum)-1)}`} >Previous</Link>}
          <Link to={`/news/${(Number(pageNum)+1)}`} >Next</Link>
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
      news: state.news,
      pages: state.pages
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