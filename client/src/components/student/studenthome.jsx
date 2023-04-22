import React from 'react';
import Navbar from './navbar';
import Scrollbar from './scrollbar';
import './studenthome.css'
import Body from './body';
function studenthome(){
    return(
    <div className="studmain">
    <div className="studmain-container">
    <Navbar/>
    <div className="studsub">
    <Scrollbar/>
    <Body/>
    </div>
    </div>
    </div>
    );
}
export default studenthome;