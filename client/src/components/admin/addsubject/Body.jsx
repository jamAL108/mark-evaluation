import React , {useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addsubject } from '../../../redux/action/adminaction';
import { ADD_SUBJECT, ADD_SUBJECT_ERROR } from '../../../redux/actiontype';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Body = () => {
   const [value , setValue] = useState({
    depart:"",
    year:"",
    subjectName:"",
    subjectCode:"",
   })
   const [proceed , setproceed] = useState(false);
   const store = useSelector((state)=>state);
   const dispatch = useDispatch();

   const [error , seterror] = useState({});

   useEffect(()=>{
     seterror(store.admin.subjectadderror);
     console.log(store.admin.subjectadderror)
   },[store.admin.subjectadderror])

   useEffect(()=>{
     setValue({
         subjectName:"",
         subjectCode:"",
         depart:value.depart,
         year:value.year
      })
      dispatch({type:ADD_SUBJECT_ERROR , payload:{}})
      dispatch({type:ADD_SUBJECT , payload:false})
   },[store.admin.subjectadded])

   const Apply = async(e)=>{
    e.preventDefault();
    setproceed(true);
   }

   const Addsubject = async(e)=>{
    e.preventDefault();
     dispatch(addsubject(value));
   }

  return (
    <form className="our faculty" method="POST" style={{background:"white"}}>
    <div className="head">
    <h1 className='heading'>add subjects</h1>
       </div>
   <div className="menu">
   <div className="form-group">
<h1 className="departmnet">Department :</h1>
             <Select
               required
               displayEmpty
               sx={{ height: 36 }}
               inputProps={{ "aria-label": "Without label" }}
               value={value.depart}
               onChange={(e) =>
                 setValue({...value , depart:e.target.value})
               }>
               <MenuItem value="">None</MenuItem>
               <MenuItem value="MECH">MECH</MenuItem>
               <MenuItem value="CSE">CSE</MenuItem>
               <MenuItem value="IT">IT</MenuItem>
               <MenuItem value="ECE">ECE</MenuItem>
             </Select>
   </div>
   <div className="form-group">
<h1 className="departmnet">Year :</h1>
             <Select
               required
               displayEmpty
               sx={{ height: 36 }}
               inputProps={{ "aria-label": "Without label" }}
               value={value.year}
               onChange={(e) =>
                 setValue({...value , year:e.target.value})
               }>
               <MenuItem value="">None</MenuItem>
               <MenuItem value="1">1</MenuItem>
               <MenuItem value="2">2</MenuItem>
               <MenuItem value="3">3</MenuItem>
               <MenuItem value="4">4</MenuItem>
             </Select>
   </div>
   <button type='submit' onClick={Apply}>Apply</button>
   </div>

   {proceed===true && (
      <div className="inp">
         <div className="form-group">
                            <input type="text" name="subjectname" placeholder="Enter subject name" id="name" className="form-control" value={value.subjectName} onChange={(e)=>{setValue({...value , subjectName:e.target.value})
                               seterror({}) }} />
                        </div>
                        <div className="form-group">
                            <input type="text" name="subcode" placeholder="Enter subject code" id="pass" className="form-control" value={value.subjectCode} onChange={(e)=>{setValue({...value , subjectCode:e.target.value})
                            seterror({}) }} />
                        </div>
      </div>
   )
   }
   <span>{error.backenderror || error.subjecterror}</span>
     <button type='submit' onClick={Addsubject}>Add subject</button>
   </form>

  )
}

export default Body