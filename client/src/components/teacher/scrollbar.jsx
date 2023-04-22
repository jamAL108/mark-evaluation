import React,{useEffect, useState} from 'react'
import './sidebar.css';
import { Link , useNavigate} from 'react-router-dom';
import {createImageFromInitials} from '../utils/createImageFromInitials';

function Scrollbar () {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const [dashboard , setdashboard]=useState(true);
  const [myclass , setmyclass]=useState(false);
  const [uploadmark,setuploadmark]=useState(false);
  const [attendance,setattendance]=useState(false);
  const [defaulter,setdefaulter]=useState(false);
  const [faqs ,setfaqs]=useState(false);
  const [depart , setdepart] =useState("");
  let imgSrc = "";
  const array1=["FE","SE","TE","BE"];
  useEffect(()=>{      
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
      <p>{`${depart}`}</p>
    </div>
     </div>

    <ul>
    <li  onClick={(e)=>{
        e.preventDefault();
        setdashboard(true);
        setattendance(false);
        setmyclass(false);
        setdefaulter(false);
        setuploadmark(false);
        setfaqs(false);
        navigate("/teacher");
    }} className={dashboard ?  "active" : "notactive"} ><h4 className='h1' >DashBoard</h4> </li>


    <li  onClick={(e)=>{
       e.preventDefault();
       setdashboard(false);
       setattendance(false);
       setmyclass(true);
       setdefaulter(false);
       setuploadmark(false);
       setfaqs(false);
      navigate("/teacher/myclass");
    }} 
     className={myclass ?  "active" : "notactive"} 
    ><h4 className='h1' >My Class</h4></li> 


     <li onClick={(e)=>{
       e.preventDefault();
       setdashboard(false);
       setattendance(true);
       setmyclass(false);
       setdefaulter(false);
       setuploadmark(false);
       setfaqs(false);
       navigate("/teacher/attendance");
     }} className={attendance ?  "active" : "notactive"}  >
      <h4 className='h1' >Attendance</h4></li>


     <li onClick={(e)=>{
                e.preventDefault();
                setdashboard(false);
                setattendance(false);
                setmyclass(false);
                setdefaulter(false);
                setuploadmark(true);
                setfaqs(false);
                navigate("/teacher/uploadmark");
     }}
     className={uploadmark ?  "active" : "notactive"}  ><h4  className='h1' >Upload mark</h4></li>
          
     <li onClick={(e)=>{
        e.preventDefault();
        setdashboard(false);
        setattendance(false);
        setmyclass(false);
        setdefaulter(true);
        setuploadmark(false);
        setfaqs(false);
        navigate("/teacher/defaulter");
     }}  className={defaulter ?  "active" : "notactive"} 
     ><h4 className='h1' >defaulter</h4></li>


     <li  onClick={(e)=>{
                  e.preventDefault();
                  setdashboard(false);
                  setattendance(false);
                  setmyclass(false);
                  setdefaulter(false);
                  setuploadmark(false);
                  setfaqs(true);
                  navigate("/teacher/faqs");
     }} className={faqs ?  "active" : "notactive"} ><h4 className='h1' >FaQs</h4></li>
    </ul>

  </nav>

  );
}

export default Scrollbar;