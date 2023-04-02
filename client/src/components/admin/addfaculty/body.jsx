import React ,{useEffect, useState }from 'react';
import  {useNavigate} from 'react-router-dom';
import {useDispatch , useSelector} from 'react-redux';
import Swal from "sweetalert2";
import { addfaculty , addfacultyerror } from '../../../redux/action/adminaction';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {ADD_FACULTY , ADD_FACULTY_ERROR } from '../../../redux/actiontype';
const Body =  () => {
const navigate = useNavigate(); 
const dispatch = useDispatch();
const[value,setValue] = useState({     
 name: "",
Gender: "",
email:"",
depart: "",
age:"",
password:"dypatil@123"});
const[error,seterror]=useState({});
const err = useSelector((state)=>state.admin.addfacultyerror);
const store = useSelector((state)=>state);
    
    
    useEffect(()=>{
      seterror(store.admin.addfacultyerror);
      console.log(store.admin.addfacultyerror);
    },[store.admin.addfacultyerror])

    useEffect(() => {
      if (store.admin.facultyadded) {
        setValue({
          name: "",
          Gender: "",
          email:"",
          depart: "",
          age:"",
          password:"dypatil@123"
        })
        seterror("");
        dispatch({ type: ADD_FACULTY_ERROR, payload: {} });
        dispatch({ type: ADD_FACULTY, payload: false });
      }
  }, [ store.admin.facultyadded]);

    const submit = async (e)=>{
      e.preventDefault();
      dispatch(addfaculty(value,navigate));
}

const clear = async(e)=>{
setValue({
  name: "",
  Gender: "",
  email:"",
  depart: "",
  age:""
  ,password:"dypatil@123"
})
  seterror("");
  dispatch({type:ADD_FACULTY_ERROR ,payload:{}})

}

  return (
    <div className="addbody" style={{background:"white"}}> 
    <h2 className="add">
        add faculty
    </h2>
    <form method="POST">
    <div className="formgroup">
    <h1 className="gender">NAME:</h1>
     <input type="text" name="name" placeholder="Enter name" id="name" autoComplete='off' className="form-control" value={value.name} onChange={(e)=>{
     setValue({...value,name:e.target.value})
     }}/>
     </div>
     <div className="formgroup">
                  <h1 className="gender">Gender :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.Gender}
                    onChange={(e) =>
                      setValue({...value,Gender:e.target.value})
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </div>


     <div className="formgroup">
     <h1 className="gender">AGE :</h1>
     <input type="text" name="age" placeholder="Enter age" id="age" autoComplete='off' className="form-control" value={value.age} onChange={(e)=>{
           setValue({...value,age:e.target.value})
     }} />
     </div>
     
     <div className="formgroup">
     <h1 className="gender">EMAIL:</h1>
     <input type="text" name="email" placeholder="Enter email" id="email" autoComplete='off' className="form-control" value={value.email} onChange={(e)=>{
        setValue({...value,email:e.target.value})
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
                      setValue({...value,depart:e.target.value})
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="MECH">MECH</MenuItem>
                    <MenuItem value="CSE">CSE</MenuItem>
                    <MenuItem value="IT">IT</MenuItem>
                    <MenuItem value="ECE">ECE</MenuItem>
                  </Select>
     </div>
    <span>{error.emailerror || error.BackendError}</span>
     <div className="form-group">

     <button type="submit"  onClick={submit}>submit</button>
     <button type="submit" onClick={clear}>clear</button>
    </div>
    </form>
    </div>
  )
}

export default Body