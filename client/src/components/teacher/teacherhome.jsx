import React from 'react';
import Navbar  from './navbar';
import Scrollbar from './scrollbar';
import Body from './Body';
import './teacherhome.css';
function teacherhome(){
    return(
        <div className="techmain">
        <div className="techmain-container">
        <Navbar/>
        <div className="techsub">
        <Scrollbar/>
        <Body/>
        </div>
        </div>
        </div>
    );
}
export default teacherhome;