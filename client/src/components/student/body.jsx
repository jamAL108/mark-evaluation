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
    const [percentag , setpercentage] = useState(0);
    const [color , setcolor] = useState("#808080");
    const store = useSelector((state)=>state);
    const [attendance , setattendance] = useState({});
    const [lectureatt , setlectureatt] = useState("--");
    const [overall , setoverall] = useState("--");
    const dispatch = useDispatch();
    useEffect(()=>{
      const data = {
        _id:user.data._id,
        depart:user.data.depart,
        year:user.data.year
      }
      console.log(data);
       dispatch(overallattendance(data))
       console.log("heeey");
    },[dispatch])

     useEffect(()=>{
      setattendance(store.student.overallattend);
      console.log(store.student.overallattend);
     },[store.student.overallattend])

     useEffect(()=>{
      const dat = attendance.percentage;
      console.log(attendance.percentage);
      const percent = parseFloat(dat).toFixed(2);
      setpercentage(percent);
      setlectureatt(attendance.lectureattended);
      setoverall(attendance.overrallec);
     },[attendance])

     useEffect(()=>{
      if(percentag>=0 && percentag<=35){
        setcolor("#f54242");
       }else if(percentag>35 && percentag<=50){
        setcolor("#f5a442");
       }else if(percentag>60 && percentag<=75){
        setcolor("#e6f542");
       }else if(percentag>75 && percentag<=100){
        setcolor("#69f542")
       }
       console.log(percentag);
     },[percentag])

     useEffect(()=>{
       setattendance(store.student.overralatterror);
     },[store.student.overralatterror])

  return (
       <div className="ssimilarbody">
        <div className="upper">
          <div className="attenchart">
            <h1>overall Attendance</h1>
            <div className="circle" style={{width:"250px" , height:"250px" , paddingBottom:"20px"}}>
            <CircularProgressbar
             className='progress'
  value={percentag}
  text={`${percentag}%`}
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
<h2>Lec attended:{lectureatt} | Overall Lec:{overall}</h2>
</div>
</div>
       
        </div>
        <div className="notice">
        <Notice/>
        </div>
       </div>
  )
}

export default Body;