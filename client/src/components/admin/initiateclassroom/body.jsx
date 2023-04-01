import React  , {useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ourfaculty , getsubject, initiateclass} from '../../../redux/action/adminaction';
import { GET_ALL_FACULTY , GET_ALL_FACULTY_ERROR, GET_SUBJECT_ERROR, GET_SUBJECT, INITIATE_CLASS, INITIATE_CLASS_ERROR} from '../../../redux/actiontype';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Body = () => {
  const [temp , settemp] = useState({
    name:"",
    email:"",
    year:0,
    division:"",
    subject:"",
    attempts:0
 })
  const store = useSelector((state)=>state);
  const [facult , setfacul] = useState([]);
  const [profil , setprofil] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error , seterror] = useState({});
  const [subjet , setsubject] = useState([]);
  const [main , setmain] = useState([]);
  const [faculerror , setfaculerror] = useState("");
    const[value ,setValue] = useState({
        depart:"",
    })  
    useEffect(()=>{
        seterror(store.admin.getfacultyerror);
        setfacul([]);
    },[store.admin.getfacultyerror])

    useEffect(()=>{
        setfacul(store.admin.faculties);
    },[store.admin.faculties])

    const search = async(e)=>{
        e.preventDefault();
        dispatch(ourfaculty(value,navigate));
    }

    const reset = async(e)=>{
      setValue({
          depart:""
      })
      setfacul([]);
      seterror({});
      dispatch({type:GET_ALL_FACULTY , payload:[]})
      dispatch({type:GET_ALL_FACULTY_ERROR , payload:{}})
      dispatch({type:GET_SUBJECT , payload:[]})
      dispatch({type:GET_SUBJECT_ERROR , payload:{}})
      setprofil(false);
      settemp(false);
      setsubject([]);
      setmain([]);
      setfaculerror("");
      
  }
    useEffect(()=>{
      setsubject(store.admin.subjects)
      console.log(store.admin.subjects)
    },[store.admin.subjects])

    const filling = async(e)=>{
      setmain(subjet.filter(sub => sub.year === temp.year))
      console.log(subjet);
      console.log(temp.year);
    }

    const Assign = async(e)=>{
      e.preventDefault();
      dispatch(initiateclass(temp));
    }

    const [finalerr , setfinalerr] = useState({});
    useEffect(()=>{
       setfinalerr(store.admin.initialclasserror)
    },[store.admin.initialclasserror])

    useEffect(()=>{
      settemp({
...temp ,
        year:0,
        division:"",
        subject:"",
        attempts:temp.attempts-1
      })
       dispatch({type:INITIATE_CLASS , payload:false})
       dispatch({type:INITIATE_CLASS_ERROR , payload:{}})
    },[store.admin.initialclass])

  return (
    <div className="our faculty" style={{background:"white"}}>
     <div className="head">
         assign teachers with thier repective classes
        </div>
    <div className="menu">
    <h1 className='heading'>our faculty</h1>
    <div className="form-group">
 <h1 className="departmnet">Department :</h1>
              <Select
                required
                displayEmpty
                sx={{ height: 36 }}
                defaultValue=""
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
              facult?.length !== 0 && (
        <div className="list-item">
             <div className="grid grid-cols-12">
                    <h1 className="heading">
                      Sr no.
                    </h1>
                    <h1 className="heading">
                      Name
                    </h1>
                    <h1 className="heading">
                      Email
                    </h1>
                  </div>
            {facult.map((fac,idx)=>(
              <button type='submit' key={idx} onClick={(e)=>{
                e.preventDefault();
                if(fac.attempts===0){
                  setfaculerror("limit reached u cant add more classes to this faculty");
                }else{
                console.log(value.depart);
                setfaculerror("");
                dispatch(getsubject(value));
                console.log("hello");
                settemp({
                  ...temp , 
                  name:fac.name,
                  email:fac.email,
                  attempts:fac.attempts
                })
                setprofil(true);  
              }        
              }}>
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
    {fac.email}
    </h1>
    </div>
    </button>
 ) )}
   </div>
        )}

    <div className="mainside
    ">
      <span>{faculerror}</span>
    { profil ===true && faculerror==="" && (
       <div className="assignstudent">
        <div className="head">
        <h1>name : {temp.name}</h1>
        <h1>email : {temp.email}</h1>
        <h1>assignmnets left : {temp.attempts}</h1>
        </div>
        <form action="POST">
        <div className="form-group">
                  <h1 className="year">Year :</h1>
                  <Select
                    required
                    displayEmpty
                    defaultValue=""
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={temp.year || ""}
                    onChange={(e) =>
                 settemp({ ...temp, year: Number(e.target.value) })
                    
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                  </Select>
     </div>
     <div className="form-group">
                  <h1 className="section">Section :</h1>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    defaultValue=""
                    inputProps={{ "aria-label": "Without label" }}
                    value={temp.division || ""}
                    onChange={(e) =>{
                      settemp({ ...temp, division: e.target.value })
                      filling()
                    }
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </Select>
                </div>
    <div className="form-group">
          <h1 className="section">Subject :</h1>
                   <Select
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    defaultValue=""
                    inputProps={{ "aria-label": "Without label" }}
                    value={temp.subject || ""}
                    onChange={(e) =>
                      settemp({ ...temp, subject: e.target.value })
                    }>
                    <MenuItem value="">None</MenuItem>
                    {main?.map((dp, idx) => (
                      <MenuItem key={idx} value={dp.subjectName}>
                        {dp.subjectName}
                      </MenuItem>
                    ))}
                  </Select>
    </div>
    
  <span>{finalerr.backenderror || finalerr.initiateerror || finalerr.limiterror}</span>

           <button onClick={Assign}>Assign</button>     
        </form>

       </div>

    )}


    </div>
    </div>
  )
}

export default Body;