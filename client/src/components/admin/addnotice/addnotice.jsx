import React from 'react';
import Logo from '../../../images/logo.png';
import Header from '../header';
import Sidebar from '../sidebar';
import Body from "./body";
function addnotice(){
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
export default addnotice;