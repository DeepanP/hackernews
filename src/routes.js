import React from 'react';
import { Route } from 'react-router-dom';
import FeedsApp from './components/app';

export default ()=>{
    return (
        <>
        <Route exact path='/' component = {FeedsApp}/>
        </>
    )
}