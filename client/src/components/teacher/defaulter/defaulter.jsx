import React from 'react'
import Body from './body';
import Header from '../navbar';
import Scrollbar from '../scrollbar';

function defaulter(){
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

export default defaulter;