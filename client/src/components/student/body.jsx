import React , {useEffect, useState}from 'react'
import Notice from './notice';
import Calender from 'react-calendar'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useDispatch, useSelector } from 'react-redux';
import 'react-circular-progressbar/dist/styles.css';
import { overallattendance } from '../../redux/action/studentaction';


const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
    const [value, onChange] = useState(new Date());
    const [percentage , setpercentage] = useState(0);
    const [color , setcolor] = useState("#808080");
    const store = useSelector((state)=>state);
    const [attendance , setattendance] = useState({});
    const dispatch = useDispatch();
    useEffect(()=>{
      const data = {
        _id:user.data._id,
        depart:user.data.depart,
        year:user.data.year
      }
       dispatch(overallattendance(data))
       if(percentage>=0 && percentage<=35){
        setcolor("#f54242");
       }else if(percentage>35 && percentage<=50){
        setcolor("#f5a442");
       }else if(percentage>60 && percentage<=75){
        setcolor("#e6f542");
       }else if(percentage>75 && percentage<=100){
        setcolor("#69f542")
       }
    },[dispatch])

     useEffect(()=>{
      setattendance(store.student.overallattend);
      console.log(store.student.overallattend);
     },[store.student.overallattend])

     useEffect(()=>{
      const percent = parseFloat(attendance.percentage).toFixed(2);
      setpercentage(percent);
      console.log(attendance);
     },[attendance])

     useEffect(()=>{
       setattendance(store.student.overralatterror);
     },[store.student.overralatterror])

  return (
       <div className="similarbody" style={{background:"white"}}>
        <div className="upper">
          <div className="attenchart">
            <h1>overall Attendance</h1>
            <div className="circle" style={{width:"200px" , height:"200px"}}>
            <CircularProgressbar
  value={percentage}
  text={`${percentage}%`}
  style={{}}
  styles={buildStyles({
    rotation: 0,
    strokeLinecap: 'round',
    textSize: '16px',
    pathTransitionDuration: 1.5,
    pathColor: color,
    textColor: '#000',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7'
  })}
/>
<p>{attendance.lectureattended}/{attendance.overrallec}</p>
</div>
          </div>
        <div className="calendar">
            <Calender onChange={onChange} value={value}/>
        </div>
        </div>
        <div className="notice">
        <Notice/>
        </div>
       </div>
  )
}

export default Body;