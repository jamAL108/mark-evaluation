import React  , {useState , useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ourfaculty , getsubject, initiateclass , getcc } from '../../../redux/action/adminaction';
import { GET_ALL_FACULTY , GET_ALL_FACULTY_ERROR, GET_SUBJECT_ERROR, GET_SUBJECT, INITIATE_CLASS, INITIATE_CLASS_ERROR, CCS} from '../../../redux/actiontype';
import Select from "@mui/material/Select";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  const [cc , setcc] = useState(false);
  const store = useSelector((state)=>state);
  const [facult , setfacul] = useState([]);
  const [profil , setprofil] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error , seterror] = useState({});
  const [subjet , setsubject] = useState([]);
  const [main , setmain] = useState([]);
  const [ccs , setccs] = useState([]);
  const [classCC , setclassCC] = useState({});
  const [lead , setlead] = useState(false);
  const [appoint , setappoint] = useState(true);
  const [finalerr , setfinalerr] = useState({});
  const [faculerror , setfaculerror] = useState("");
  const [display , setdisplay] = useState(false);
    const[value ,setValue] = useState({
        depart:"",
    })  
    useEffect(()=>{
        seterror(store.admin.getfacultyerror);
        setfacul([]);
    },[store.admin.getfacultyerror])

    useEffect(()=>{
      setfinalerr(store.admin.initialclasserror)
   },[store.admin.initialclasserror])

    useEffect(()=>{
      setccs(store.admin.ccs);
      console.log(store.admin.ccs);
      console.log("nkjsbvkjrjbkwrbv");
    },[store.admin.ccs])

    useEffect(()=>{
      if(temp.name!=="" , temp.year!=="" ) {
      dispatch(getcc(value));
      console.log("kjnwewget4htymujmmtujjtynjtnjtynjtnjtnjtynj");
      }
    },[temp])

    useEffect(()=>{
        setfacul(store.admin.faculties);
    },[store.admin.faculties])

    useEffect(()=>{
       console.log(facult);
    },[facult])

    useEffect(()=>{
      if(store.admin.initialclass===true){
      settemp({
        ...temp ,
        year:0,
        division:"",
        subject:"",
        attempts:temp.attempts-1
      })
       dispatch({type:INITIATE_CLASS , payload:false})
       dispatch({type:INITIATE_CLASS_ERROR , payload:{}})
    }
    },[store.admin.initialclass])

    useEffect(()=>{
      setsubject(store.admin.subjects)
      console.log(store.admin.subjects)
    },[store.admin.subjects])
     
   useEffect(()=>{
     if(temp.division!=="" && temp.year!==""){
      classcordi(temp.division , temp.year);
     }
   },[temp.division , temp.year])

    useEffect(()=>{
      dispatch({type:INITIATE_CLASS_ERROR , payload:{}})
      setfinalerr({});
      seterror({});
      setfaculerror("");
    },[temp.year , temp.division , temp.subject])


    const search = async(e)=>{
        e.preventDefault();
        dispatch(ourfaculty(value));
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
      setclassCC({})
      setlead(false);
      setappoint(true);
      setfinalerr({});
      dispatch({type:CCS , payload:[]});
      setccs([]);
      setcc(false);
  }

    const filling = async(e)=>{
      setmain(subjet.filter(sub => sub.year === temp.year))
      console.log(subjet);
      console.log(temp.year);
    }

    const Assign = async(e)=>{
      e.preventDefault();
      setlead(false);
      const obj = {
        temp:temp,
        ccs:cc,
        value:value
      }
      dispatch(initiateclass(obj));
    }


    const classcordi = async(division , year)=>{
        if(ccs.length===0){
          setappoint(true);
        }else{
          console.log(ccs);
            for(var k=0;k<ccs.length;k++){
               if(ccs[k].division === division && ccs[k].year === Number(year)){
                   setclassCC(ccs[k])
                   setappoint(false);
                   return;
               }
               setappoint(true);
            }
        }
    };

    const handlecheckbox = async(e)=>{
      if (e.target.checked) {
        setcc(true);
        console.log("heyyy");
      } else {
        setcc(false);
      }
    };

  return (
    <div className="our faculty" style={{background:"white"}}>
      {display===false && (
      <div className="departselect">
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
         Email
       </th>
       </tr>
     </thead>
     <tbody>
{facult.map((fac,idx)=>(
<tr
key={idx}
className="contiii" type='submit'  onClick={(e)=>{
  e.preventDefault();
  setdisplay(true);
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
}}}>
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
{fac.email}
</td>
</tr>
) )}
</tbody>
</table>
  )}
</div>

)}





{display===true && (
    <div className="mainside
    ">
         <ArrowBackIcon onClick={(e)=>{
    setdisplay(false);
    settemp({
      ...temp ,
      year:0,
      division:"",
      subject:""
    })
       }}/>
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
                    onChange={(e) =>{
                 settemp({ ...temp, year: Number(e.target.value) })
                 setfaculerror("");
                    }
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
                      setlead(true);
                      setfaculerror("");
                    }
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                  </Select>
                </div>
    
    {appoint===false && lead===true && (
       <h2>class co-ordinator - {value.division} : {classCC.name} </h2>
    )}

    {appoint===true && lead ===true &&(
        <div className="form">
          <input type="checkbox" value={ "YES" || "" } onChange={handlecheckbox}/>
          <h2>Assign the teacher as Class Co-ordinator....</h2>
        </div>
    )}
     
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

)}

    </div>
  )
}

export default Body;





