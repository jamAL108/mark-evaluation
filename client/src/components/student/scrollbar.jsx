import React,{useEffect, useState} from 'react'
import './sidebar.css';
import { Link , useNavigate , NavLink} from 'react-router-dom';
import {createImageFromInitials} from '../utils/createImageFromInitials';
import { getRandomColor } from '../utils/getRandomColor';
function Scrollbar () {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [dashboard , setdashboard]=useState(true);
  const [faculties , setfaculties]=useState(false);
  const [attendance,setattendance]=useState(false);
  const [viewmark,setviewmark]=useState(false);
  const [result,setresult]=useState(false);
  const [faqs ,setfaqs]=useState(false);
  const [year , setyear]=useState("");
  const [depart , setdepart] =useState("");
  let imgSrc = "";
  const array1=["FE","SE","TE","BE"];
  useEffect(()=>{
     setyear(array1[user.data.year-1]);
      
     if(user.data.depart==="CSE"){
      setdepart("Comps Eng");
     }else if(user.data.depart==="MECH"){
      setdepart("Mech Eng");
     }else if(user.data.depart==="IT"){
      setdepart("IT depart");
     }else{
      setdepart("Electrical Eng");
     }
  },[user])



const resultfunc=(e)=>{
  e.preventDefault();
  setdashboard(false);
  setattendance(false);
  setfaculties(false);
  setresult(true);
  setviewmark(false);
  setfaqs(false);
}
const facultiefunc=(e)=>{
  e.preventDefault();
  setdashboard(false);
  setattendance(false);
  setfaculties(true);
  setresult(false);
  setviewmark(false);
  setfaqs(false);
}
const faqsfunc=(e)=>{
  e.preventDefault();
  setdashboard(false);
  setattendance(false);
  setfaculties(false);
  setresult(false);
  setviewmark(false);
  setfaqs(true);
}
   
  return (
      <nav className="sidebar">
        <div class="text">
        <img
				id='preview'
				src={
					imgSrc.length <= 0
						? createImageFromInitials(500, user.data.name, "#C9243F")
						: imgSrc
				}
				alt='profile-pic'
			/>
        <div className="details">
          <h4>{user.data.name}</h4>
          <p>{`${year} ${user.data.division} div ${depart}`}.</p>
        </div>
         </div>

        <ul>
        <li className={dashboard ?  "active" : "notactive"} onClick={(e)=>{
            e.preventDefault();
            setdashboard(true);
            setattendance(false);
            setfaculties(false);
            setresult(false);
            setviewmark(false);
            setfaqs(false);
            navigate("/student");
        }}><h4 className='h1' >DashBoard</h4> </li>


        <li className={faculties ?  "active" : "notactive"} onClick={(e)=>{
           e.preventDefault();
           setdashboard(false);
           setattendance(false);
           setfaculties(true);
           setresult(false);
           setviewmark(false);
           setfaqs(false);
          navigate("/student/faculties");
        }} 
        ><h4 className='h1' >My faculties</h4></li> 


         <li className={attendance ?  "active" : "notactive"} onClick={(e)=>{
           e.preventDefault();
           setdashboard(false);
           setattendance(true);
           setfaculties(false);
           setresult(false);
           setviewmark(false);
           setfaqs(false);
           navigate("/student/attendance");
         }} >
          <h4 className='h1' >Attendance</h4></li>


         <li className={viewmark ?  "active" : "notactive"} onClick={(e)=>{
                    e.preventDefault();
                    setdashboard(false);
                    setattendance(false);
                    setfaculties(false);
                    setresult(false);
                    setviewmark(true);
                    setfaqs(false);
                    navigate("/student/viewmark");
         }} ><h4  className='h1' >  View mark</h4></li>
              
         <li className={result ?  "active" : "notactive"}  onClick={(e)=>{
            e.preventDefault();
            setdashboard(false);
            setattendance(false);
            setfaculties(false);
            setresult(true);
            setviewmark(false);
            setfaqs(false);
            navigate("/student/result");
         }} ><h4 className='h1' >Result</h4></li>


         <li className={faqs ?  "active" : "notactive"} onClick={(e)=>{
                      e.preventDefault();
                      setdashboard(false);
                      setattendance(false);
                      setfaculties(false);
                      setresult(false);
                      setviewmark(false);
                      setfaqs(true);
                      navigate("/student/faqs");
         }} ><h4 className='h1' >FaQs</h4></li>

        </ul>
      </nav>
  );
}

export default Scrollbar;