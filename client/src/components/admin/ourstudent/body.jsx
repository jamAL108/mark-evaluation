import React, { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ourstudent } from '../../../redux/action/adminaction';
import { useNavigate } from 'react-router-dom';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { GET_ALL_STUDENT , GET_ALL_STUDENT_ERROR } from '../../../redux/actiontype';

const Body = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector((state)=>state);
    const students = useSelector((state)=>state.admin.student);
    const [error,seterror]=useState({});
    const [student , setstudent] = useState([]);
    const err = useSelector((state)=>state.admin.getstudenterror);
    const [value , setValue] = useState({
        year:"",
      depart:"",
      division:""
    })

    useEffect(()=>{
        seterror(store.admin.getstudenterror);
        setstudent([]);
    },[store.admin.getstudenterror])

    const search = async(e)=>{
        dispatch(ourstudent(value,navigate));
    }
    
    useEffect(()=>{
        setstudent(store.admin.students);
        console.log(student);
    },[store.admin.students])

    const reset = async(e)=>{
        setstudent([]);
        dispatch({type:GET_ALL_STUDENT_ERROR , payload:{}})
        dispatch({type:GET_ALL_STUDENT , payload:[]})
    }
   
    return(
       <div className="our faculty" style={{background:"white"}}>
        <h1 className='heading'>our student</h1>
        <div className="menu">
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
     <h1 className="departmnet">Division :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.division}
                    onChange={(e) =>
                      setValue({...value , division:e.target.value})
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </Select>
        </div>
        <button type='submit' onClick={search}>Search</button>
        <button type='submit' onClick={reset}>reset</button>
        </div>

       {Object.keys(error).length === 0 &&
              student?.length !== 0 && (
                <table className='styled-table'>
                <thead>
                 <tr>
                       <th className="heading">
                         Sr no.
                       </th>
                       <th className="heading">
                         Name
                       </th>
                       <th className="heading">
                         dob
                       </th>
                       <th className="heading">
                         Rollno
                       </th>
                       <th className="heading">
                         Batch
                       </th>
                       </tr>
                     </thead>
                     <tbody>
               {student.map((fac,idx)=>(
      <tr
            key={idx}
        className="cont">
           <td
         className="cont">
         {idx + 1}
        </td>
        <td
        className="cont">
        {fac.name}
           </td>
           <td
       className="cont">
       {fac.dob}
       </td>
       <td
       className="cont">
       {fac.Rollno}
       </td>
       <td
       className="cont">
         {fac.batch}
      </td>
       </tr>
   
            ) )}
                </tbody>
           </table>
        )}


       </div>
    );

};
export default Body;


{/* <div className="list-item">
<div className="grid grid-cols-12">
       <h1 className="heading">
         Sr no.
       </h1>
       <h1 className="heading">
         Name
       </h1>
       <h1 className="heading">
         dob
       </h1>
       <h1 className="heading">
         rollno
       </h1>
       <h1 className="heading">
         batch
       </h1>
     </div>
{student.map((stu,idx)=>(
<div
key={idx}
className="cont">
<h1
className="cont">
{idx + 1}
</h1>
<h1
className="cont">
{stu.name}
</h1>
<h1
className="cont">
{stu.dob}
</h1>
<h1
className="cont">
{stu.rollno}
</h1>
<h1
className="cont">
{stu.batch}
</h1>
</div>

) )}
</div> */}