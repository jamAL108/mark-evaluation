import React from 'react';
import Body from './body';
import Header from './header';
import Sidebar from './sidebar';
import './adminhome.css'
function AdminHome(){
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
export default AdminHome;