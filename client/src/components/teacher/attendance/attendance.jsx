import React from 'react'
import Body from './Body';
import Header from '../navbar';
import Scrollbar from '../scrollbar';

function attendance(){
  return (
    <div className="techmain">
    <div className="techmain-container">
    <Header/>
    <div className="techsub">
    <Scrollbar/>
    <Body/>
    </div>
    </div>
    </div>
  )
}

export default attendance;