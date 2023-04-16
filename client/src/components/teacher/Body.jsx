import React , {useState}from 'react'
import Notice from './notice';
import Calender from 'react-calendar'
import './Body.css';
const Body = () => {
    const [value, onChange] = useState(new Date());
  return (
       <div className="similarbody">
        <div className="calendar">
            <Calender onChange={onChange} value={value}/>
        </div>
        <div className="notice">
        <Notice/>
        </div>
       </div>
  )
}

export default Body;