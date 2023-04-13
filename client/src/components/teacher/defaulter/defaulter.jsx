import React from 'react'
import Body from './body';
import Header from '../navbar';
import Scrollbar from '../scrollbar';

function defaulter(){
  return (
    <>
    <Header/>
    <Scrollbar/>
    <Body/>
    </>
  )
}

export default defaulter;