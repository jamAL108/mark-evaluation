import React from 'react';
import Header from '../header';
import Sidebar from '../sidebar';
import Body from './Body';
function addsubject(){
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
export default addsubject;