import React from 'react'
import Header  from '../navbar';
import Scrollbar from '../scrollbar';
import Body from './Body';

function faqs(){
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
  );
}

export default faqs;