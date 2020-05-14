import React, {useState, useEffect} from "react";
import Feed from "./Feed";

const FeedsApp = ()=>{

  const [page, setPage] = useState(1);

  const renderFeeds = ()=>{
    return <Feed/>;
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

export default FeedsApp;