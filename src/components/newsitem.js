import React, {useState, useEffect} from "react";
import moment from "moment";

const NewsItem = React.memo(({news, domain, index})=>{

  const [upVoteIcon, setUpVoteIcon] = useState(true);
    const [point, setPoint] = useState(0);
    const [showNews, setShowNews] = useState(true);
    const [hideNewsOnLoad, setHideNewsOnLoad] = useState(false);
    const isHideNews = () =>{
        if(localStorage.getItem('hiddenNews')){
            const hiddenNews = JSON.parse(localStorage.getItem('hiddenNews'));
            const isHidden = hiddenNews.filter((itemId) => {
                return news.objectID === itemId;
            });
            return  isHidden.length > 0;
        }
        else {
            return false;
        }
    }
    const hideNews = () => {
        let newSession = [];
        if (localStorage.getItem('hiddenNews')) {
            newSession = JSON.parse(localStorage.getItem('hiddenNews'));
            newSession.push(news.objectID);
            localStorage.setItem('hiddenNews', JSON.stringify(newSession));
        } else {
            newSession.push(news.objectID);
               
            localStorage.setItem('hiddenNews', JSON.stringify(newSession));
        }
        setShowNews(false);
    }
    const upvoteHandler = () => {
        let upVoteSession;
        if (sessionStorage.getItem('upVotedNews')) {
          upVoteSession = JSON.parse(sessionStorage.getItem('upVotedNews'));
          upVoteSession[news.objectID] = news.points + 1;
            sessionStorage.setItem('upVotedNews', JSON.stringify(upVoteSession));
        } else {
          upVoteSession = {
                [news.objectID]: news.points + 1
            };
            sessionStorage.setItem('upVotedNews', JSON.stringify(upVoteSession));
        }
        setPoint(point + 1);
        setUpVoteIcon(false);
    }
    
    useEffect(() => {
        setUpVoteIcon(upVoteIcon);
        setHideNewsOnLoad(isHideNews());
    }, [upVoteIcon]);

  return showNews && !hideNewsOnLoad && (
    <div key={index} className='wrapper'>
      <div className='comments'>{index+1}</div>
      <div className='upvotes'>
        {news.points + point}
        {upVoteIcon && <button aria-label="news upvote" className='upvote-action' onClick={upvoteHandler}></button>}
      </div>
      <div className='main'>
        <div className='title' dangerouslySetInnerHTML={{__html: news.title}}></div>
          <details className='info-mobile'>
            <summary>details</summary>
            <div className='domain'>{domain ? `(${domain})` : ''}</div>
            <div className='by-text'>by <div className='author'>{news.author}</div></div>
            <div className='time'>{moment(news.created_at, "YYYYMMDD").fromNow()}</div>
          </details>
          <div className='info-desktop'>
            <div className='domain'>{domain ? `(${domain})` : ''}</div>
            <div className='by-text'>by</div>
            <div className='author'>{news.author}</div>
            <div className='time'>{moment(news.created_at, "YYYYMMDD").fromNow()}</div>
          </div>
      </div>
      <div className='hide-action'><button className='hide-text' onClick={hideNews}>hide</button></div>
    </div>
  );
});

export default NewsItem;