import React from "react";

const Feed = ()=>{
  return (
    <div className='wrapper'>
      <div className='comments'></div>
      <div className='upvotes'>
      </div>
      <div className='title'>feed title</div>
      <details className='info-mobile'>
        <summary>details</summary>
        <div className='domain'>domain</div>
        <div className='by-text'>by</div>
        <div className='author'>author</div>
        <div className='time'>time</div>
      </details>
        <div className='info-desktop'>
          <div className='domain'>domain</div>
          <div className='by-text'>by</div>
          <div className='author'>author</div>
          <div className='time'>time</div>
        </div>
      <div className='hide-action'>[<span className='hide-text'>hide</span>]</div>
    </div>
  );
}

export default Feed;