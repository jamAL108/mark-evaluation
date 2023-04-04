import React , {useEffect , useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useSelector , useDispatch} from "react-redux"
import { ATTENDANCE, ATTENDANCE_DATES, ATTENDANCE_ERROR } from '../../../redux/actiontype';
import { viewattendance ,getdates } from '../../../redux/action/studentaction';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const Body = () => {
  const store = useSelector((state)=>state);
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [arrow , setarrow] = useState(false); 
  const [data , setdata] = useState([]);
  const [main , setmain] = useState([]);
  const [dates , setdates] = useState([]);
  const [display , setdisplay] = useState(false);
  const [month , setmonth] = useState("");
  const [make , setmake] = useState(false);
  const array =["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  const [value , setvalue] = useState({
    _id:user.data._id,
    depart:user.data.depart,
    year:user.data.year,
    division:user.data.division
  });

  useEffect(()=>{
    console.log(value);
    dispatch(viewattendance(value));
  },[dispatch])
  
  useEffect(()=>{
    setdisplay(false);
    if(store.student.overallattendance && store.student.monthattendance){
      console.log("inside month change effect");
      console.log(store.student.overallattendance)
      console.log(store.student.monthattendance)
   if(month==="Overall"){
      setdata(store.student.overallattendance);
   }else{
    console.log("wanakam");
    setdata(store.student.monthattendance);
   }
   setmake(true);
  }
  },[month])
  
  useEffect(()=>{
    if(data.length!==0 && make===true){
    console.log("data milgaya");
    console.log(array);
    if(month!=="Overall"){
    for(var i=0;i<array.length;i++){
      if(array[i]===month){
        setmain(data[i]);
        console.log(data[i]);
      }
    }
  }else{
    console.log("namaste");
    setmain(data);
  }
  setmake(false);
}
},[make,data])

  useEffect(()=>{
    if(main.length!==0){
      setdisplay(true)
    }else{
      console.log("nkdsvjbs");
    }
  },[main])
 

  const getattendancedate = async(subject)=>{
    dispatch({type:ATTENDANCE_DATES , payload:[]})
      dispatch(getdates(subject));
  };

  return (
     <div className="attendance" style={{background:"white"}}>
           { arrow===false && (
            <div className="frontpage">
           <div className="form-group">
                  <h1 className="section">Month :</h1>
                  <Select 
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    defaultValue=""
                    inputProps={{ "aria-label": "Without label" }}
                    value={month}
                    onChange={(e) =>{
                      setmonth(e.target.value)
                      console.log(e.target.value)
                    }
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Overall">Overall</MenuItem>
                    <MenuItem value="jan">jan</MenuItem>
                    <MenuItem value="feb">feb</MenuItem>
                    <MenuItem value="mar">mar</MenuItem>
                    <MenuItem value="apr">apr</MenuItem>
                    <MenuItem value="may">may</MenuItem>
                    <MenuItem value="jun">jun</MenuItem>
                    <MenuItem value="jul">jul</MenuItem>
                    <MenuItem value="aug">aug</MenuItem>
                    <MenuItem value="sep">sep</MenuItem>
                    <MenuItem value="oct">oct</MenuItem>
                    <MenuItem value="nov">nov</MenuItem>
                    <MenuItem value="dec">dec</MenuItem>
                  </Select>
                </div>
        {display===true && main.length!==0 && (
            <table className='styled-table'>
            <thead>
             <tr>
               <th className="heading">
                                  Sr no.
                                </th>
                                <th className="heading">
                                  subject
                                </th>
                                <th className="heading">
                                  subject code
                                </th>
                                <th className="heading">
                                  lectures attended
                                </th>
                                <th className="heading">
                                  percentage
                                </th>
                                </tr>
                                </thead>
                              <tbody>
                        {main?.map((attend,idx)=>(
               <tr
                     key={idx}
                 className="cont">
                    <td
                  className="contiii" onClick={(e)=>{
                    getattendancedate(attend);
                  }}  >
                  {idx + 1}
                 </td>
                 <td
                 className="cont">
                 {attend.subject}
                    </td>
                    <td
                className="cont">
                {attend.subjectCode}
                </td>
                <td
                className="cont">
                  {attend.attended} / {attend.totallec}
                </td>
                <td
                className="cont">
                  {attend.percentage || 0}
                </td>
                </tr>
                     ) )}
                         </tbody>
                    </table>
        )}
    </div>
        )}

        {arrow===true && (
           <div className="secondpage">
               <ArrowBackIcon onClick={(e)=>{
            setarrow(false);
            dispatch({type:ATTENDANCE_DATES , payload:[]});
            dispatch({type:ATTENDANCE_ERROR , payload:{}})
            setdates([]);
          }}
            />
             <table className='styled-table'>
            <thead>
             <tr>
               <th className="heading">
                                Sr no.
                                </th>
                                <th className="heading">
                                  Date
                                </th>
                                <th className="heading">
                                  lecture
                                </th>
                                <th className="heading">
                                 Attendance
                                </th>
                                </tr>
                                </thead>
                              <tbody>
                        { dates?.map((date,idx)=>(
               <tr
                     key={idx}
                 className="cont">
                    <td
                  className="contiii">
                  {idx + 1}
                 </td>
                 <td
                 className="cont">
                 {date.date}
                    </td>
                    <td
                className="cont">
                {date.lecture}
                </td>
                <td
                className="cont">
                  {date.attendance}
                </td>
                </tr>
                     ) )}
                         </tbody>
                    </table>
           </div>
        )}

                 
     </div>
  )
}

export default Body;