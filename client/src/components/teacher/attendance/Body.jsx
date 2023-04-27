import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import moment from "moment";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { attendancestudentfetch, MarkAttendance } from '../../../redux/action/facultyaction';
import {  ATTENDANCE_MARKED, ATTENDANCE_MARKED_ERROR , T_GET_ALL_STUDENT_ERROR , T_GET_ALL_STUDENT} from '../../../redux/actiontype';
import './body.css';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const clas =user.data.class;
  const dispatch = useDispatch();
  const [cond , setcond] = useState(false);
  const [error , seterror] = useState({});
  const [ownerror , setownerror] = useState("");
  const [students , setstudents] = useState([])
  const [value , setValue] = useState({
    date:moment().format('YYYY-MM-DD'),
    time:""
  });
  const [display , setdisplay] = useState(false);
  const [maindisplay , setmaindisplay] = useState(false);

  const [subj , setsubj] = useState({
    depart:"",
    year:"",
    division:"",
    subject:""
  })

  const store = useSelector((state)=>state)
  const [checkedValue, setCheckedValue] = useState([]);
  
    
  useEffect(()=>{
    if(user.data.class.length===0){
      setmaindisplay(false);
      setownerror("You have not being yet initialized with any class pls contact the admin...!");
    }else{
      setmaindisplay(true);
    }
  },[user])

const handlecheckbox=(e)=>{
       const tempCheck = checkedValue;
    let index;
    if (e.target.checked) {
      tempCheck.push(e.target.value);
    } else {
      index = tempCheck.indexOf(e.target.value);
      tempCheck.splice(index, 1);
    }
    setCheckedValue(tempCheck);
};


useEffect(()=>{
   setstudents(store.faculty.students);
},[store.faculty.students])

useEffect(()=>{
  dispatch(attendancestudentfetch(subj))
},[subj])

useEffect(()=>{
   console.log(students);
},[students])

useEffect(()=>{
   if(store.faculty.attendancedone===true){
       setcond(false);
       dispatch({type:T_GET_ALL_STUDENT , payload:[]})
       dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
       dispatch({type:ATTENDANCE_MARKED , payload:false})
       dispatch({type:ATTENDANCE_MARKED_ERROR , payload:{}})
       setsubj({depart:"", year:"", division:"",subject:""
      });
      setValue({...value , time:""})
      setdisplay(false)
      setstudents([])
      setCheckedValue([]);
     
   }
},[store.faculty.attendancedone])

const uploadattendance=()=>{
  dispatch(MarkAttendance({value ,checkedValue , subj  }))
}

  return (
    <div className="markattendance">
   { maindisplay===false && (          
            <div className="error">
            <h1><ErrorOutlineRoundedIcon className='icon' />{ownerror}</h1>
            </div>)}

   {maindisplay===true && (
      <div className="main-content">
       {cond===false && (
        <div className="tablee">
          <table>
            <tr id='headering' >
              <th>
                Sr no.
              </th>
               <th>
                 Year
               </th>
               <th>
                 Division
               </th>
               <th>
                 Subject
               </th>
            </tr>
            <tbody>
            {clas?.map((dat,idx)=>(
             <tr key={idx} onClick={(e)=>{
              e.preventDefault();
                setcond(true)
                setdisplay(false)
                setsubj({
                  depart:user.data.depart,
                  year:dat.year,
                  division:dat.division,
                  subject:dat.subject
                })
             }}>
              <td>{idx+1}</td>
               <td>{dat.year}</td>
               <td>{dat.division}</td>
               <td>{dat.subject}</td>
             </tr>
          ))}
            </tbody>
          </table>       
        </div>
       )}

    {cond===true  && (
      <div className="attendance">
          <ArrowBackIcon className='icon' onClick={(e)=>{
               setcond(false);
               setsubj({depart:"", year:"", division:"",subject:""
              });
              setValue({...value , time:""})

              setdisplay(false)
               setstudents([])
               dispatch({type:T_GET_ALL_STUDENT , payload:[]})
               dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
      }}/>
        <div className="details">
        <div className="formgroupp">
                  <h1 >Date :</h1>
                  <input
                    required
                    placeholder="YYYY-MM-DD"
                    type="date"
                    value={value.date}
                    onChange={(e) =>{
                      setValue({ ...value, date: e.target.value })
                      console.log(value.date)
                    }
                    }
                  />
                </div>
        <div className="formgroupp">
        <h1>Time :</h1>
        <input type="text" name="Time" placeholder="Enter Time" id="Time" autoComplete='off' className="" value={value.time} onChange={(e)=>{
      setValue( {...value , time:e.target.value})
     }} />
       </div>
       </div>


        <div className="entry">
         <h1>Attendance {value.date} : {value.time}</h1>
         <div className="tablee">
         <table>
                   <tr id='headering'>
                         <th className="heading">
                           Sr no.
                         </th>
                         <th className="heading">
                           Rollno
                         </th>
                         <th className="heading">
                           Name
                         </th>
                         <th className="heading">
                           Attendance
                         </th>
                         </tr>
                       <tbody>
         {students?.map((student,idx)=>(
        <tr
              key={idx}
          className="cont">
             <td
           className="cont">
           {idx + 1}
          </td>
          <td
          className="cont">
          {student.Rollno}
             </td>
             <td
         className="cont">
         {student.name}
         </td>
         <td
         className="cont">
          <input type="checkbox" value={ student._id || "" } onChange={handlecheckbox}/>
         </td>
         </tr>
              ) )}
                  </tbody>
             </table>
             </div> 
             <div className="butn">
             <button className='btn' onClick={uploadattendance}>Upload</button>
             </div>
      </div>
      </div>
    )}
    </div>
    )}
    </div>
  )
}

export default Body;