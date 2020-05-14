import React, {useState, useEffect} from "react";
import NewsItem from "./newsitem";

const NewsApp = ()=>{

  const [page, setPage] = useState(1);

  const renderFeeds = ()=>{
    return <NewsItem/>;
  }
  const loadMore = ()=>{
    setPage(page+1);
  }
  useEffect(()=>{
    console.log(page);
  },[page]);

  return (
    <>
        {renderFeeds()}
        <div className='footer'><button className='btn-more' onClick={loadMore}>more</button></div> 
    </>
  );
}

export default NewsApp;