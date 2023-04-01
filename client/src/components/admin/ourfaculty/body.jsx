import React, { useEffect , useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ourfaculty } from '../../../redux/action/adminaction';
import { useNavigate } from 'react-router-dom';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { GET_ALL_FACULTY , GET_ALL_FACULTY_ERROR } from '../../../redux/actiontype';

const Body = ()=>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const store = useSelector((state)=>state);
    const faculties = useSelector((state)=>state.admin.faculties);
    const [depart , setdepart] = useState("");
    const [error,seterror]=useState({});
    const [facul , setfacul] = useState([]);
    const err = useSelector((state)=>state.admin.getfacultyerror);
    const [value , setValue] = useState({
      name:"",
      depart:""
    })

    useEffect(()=>{
        seterror(store.admin.getfacultyerror);
        setfacul([]);
    },[store.admin.getfacultyerror])

    const search = async(e)=>{
         e.preventDefault();
        dispatch(ourfaculty(value,navigate));
    }
    useEffect(()=>{
        setfacul(store.admin.faculties);
    },[store.admin.faculties])

    const reset = async(e)=>{
        setdepart("");
        setdepart("None");
        setfacul([]);
        dispatch({type:GET_ALL_FACULTY , payload:[]})
    }
   

    return(
       <div className="our faculty" style={{background:"white"}}>
        <h1 className='heading'>our faculty</h1>
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
        <span>{error.backenderror || error.facultynotfound}</span>
        <button type='submit' onClick={search}>Search</button>
        <button type='submit' onClick={reset}>reset</button>
        </div>

       {Object.keys(error).length === 0 &&
              facul?.length !== 0 && (
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
                      Email
                    </th>
                    <th className="heading">
                      Designation
                    </th>
                    </tr>
                  </thead>
                  <tbody>
            {facul.map((fac,idx)=>(
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
    {fac.age}
    </td>
    <td
    className="cont">
    {fac.email}
    </td>
    <td
    className="cont">
      {fac.depart}
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
         Email
       </h1>
       <h1 className="heading">
         Designation
       </h1>
     </div>
{facul.map((fac,idx)=>(
<div
key={idx}
className="cont">
<h1
className="cont">
{idx + 1}
</h1>
<h1
className="cont">
{fac.name}
</h1>
<h1
className="cont">
{fac.age}
</h1>
<h1
className="cont">
{fac.email}
</h1>
<h1
className="cont">
{fac.depart}
</h1>
</div>

) )}
</div> */}