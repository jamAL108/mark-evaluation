import React from 'react'
import Body from './Body';
import Header from '../navbar';
import Scrollbar from '../scrollbar';

function result(){
  return (
    <div className="studmain">
    <div className="studmain-container">
    <Header/>
    <div className="studsub">
    <Scrollbar/>
    <Body/>
    </div>
    </div>
    </div>
  )
}

export default result;