import React from 'react';
import Body from './body';
import Header from '../header';
import Sidebar from '../sidebar';

function cpga(){
    return(
        <div className="main">
        <div className="main-container">
        <Header/>
        <div className="sub">
        <Sidebar/>
        <Body/>
        </div>
        </div>
        </div>
    );
}

export default cpga;