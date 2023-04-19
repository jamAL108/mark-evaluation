import React ,{useState , useEffect}from 'react';
import  {useNavigate} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import Swal from "sweetalert2";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { addstudent }  from "../../../redux/action/adminaction";
import { SET_ERRORS } from '../../../redux/actiontype';
import { ADD_STUDENT , ADD_STUDENT_ERROR } from '../../../redux/actiontype';
const Body =  () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  const err = useSelector((state)=>(state.admin.addstudenterror));
  let ei ="";
  // const departments = useSelector((state) => state.admin.allDepartments);
const [value, setValue] = useState({
  name: "",
  gender: "",
  dob: "",
  Rollno:"",
  depart: "",
  year: "",
  division: "",
  batch: "",
  password:"dypatil@123"
});
useEffect(()=>{
  setError(store.admin.addstudenterror);
  ei = store.admin.addstudenterror;
  console.log(store.admin.addstudenterror);
},[store.admin.addstudenterror]);

useEffect(() => {
    if (store.admin.studentadded) {
      setValue({
        name: "",
        dob: "",
        Rollno: "",
        depart: "",
        gender: "",
        year: "",
        division: "",
        batch: "",
        email:"",
        password:"dypatil@123"
      });
      dispatch({ type: ADD_STUDENT_ERROR, payload: {} });
      dispatch({ type: ADD_STUDENT, payload: false });
    }
}, [ store.admin.studentadded]);
 const submit = async(e)=>{
      e.preventDefault();
      dispatch(addstudent(value,navigate));
}
const clear = async(e)=>{
    setValue({
      name: "",
      gender: "",
      dob: "",
      Rollno:"",
      depart: "",
      year: "",
      division: "",
      batch: "",
      email:"",
      password:"dypatil@123"
   });
   setError("");
   dispatch({type:ADD_STUDENT_ERROR , payload:""})
}
  return (
    <div className="addbody" style={{background:"white"}}> 
    <div className="header">
        add Student
    </div>
    <form method="POST">
    <div className="formgroup">
     <input type="text" name="name" placeholder="Enter name" id="name" autoComplete='off' className="form-control" value={value.name} onChange={(e)=>{
      setValue({...value , name:e.target.value})
     }}/>
     </div>
     <div className="formgroup">
                  <h1 className="DOB">DOB :</h1>
                  <input
                    required
                    placeholder="DD/MM/YYYY"
                    className="inpit"
                    type="date"
                    value={value.dob}
                    onChange={(e) =>
                      setValue({ ...value, dob: e.target.value })
                    }
                  />
                </div>
                <div className="formgroup">
                  <h1 className="gender">Gender :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.gender}
                    onChange={(e) =>
                      setValue({ ...value, gender: e.target.value })
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </div>

     <div className="formgroup">
     <input type="text" name="rollno" placeholder="Enter  rollno" id="email" autoComplete='off' className="form-control" value={value.Rollno} onChange={(e)=>{
      setValue( {...value , Rollno:e.target.value})
     }} />
     </div>
     <div className="formgroup">
     <input type="text" name="email" placeholder="Enter email" id="email" autoComplete='off' className="form-control" value={value.email} onChange={(e)=>{
      setValue( {...value , email:e.target.value})
     }} />
     </div>
     
     <div className="formgroup">
     <h1 className="departmnet">Department :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.depart}
                    onChange={(e) =>
                      setValue({ ...value, depart: e.target.value })
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="MECH">MECH</MenuItem>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="ECE">ECE</MenuItem>
                  </Select>
     </div>
     <div className="formgroup">
                  <h1 className="year">Year :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.year}
                    onChange={(e) =>
                      setValue({ ...value, year: e.target.value })
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
     </div>
     <div className="formgroup">
                  <h1 className="section">Section :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.division}
                    onChange={(e) =>
                      setValue({ ...value, division: e.target.value })
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </Select>
                </div>

   <div className="formgroup">
                  <h1 className="batch">Batch :</h1>

                  <input
                    required
                    placeholder="yyyy-yyyy"
                    className="inpit"
                    type="text"
                    value={value.batch}
                    onChange={(e) =>
                      setValue({ ...value, batch: e.target.value })
                    }
                  />
                </div>    
                <span>{error.rollnoerror}</span>             
     <div className="formgroup">
     <button type="submit" onClick={submit}>submit</button>
    </div>
    <div className="form-group">
     <button type="submit" onClick={clear}>clear
    </button>
    </div>
    </form>
    </div>
  )
}

export default Body