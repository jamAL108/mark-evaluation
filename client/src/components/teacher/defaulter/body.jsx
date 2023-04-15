import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getdefaulter } from '../../../redux/action/facultyaction';
import { getsubjects } from '../../../redux/action/facultyaction';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Body = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const clas = user.data.class;
    const [other,setother] = useState({});
    const [cc,setcc] = useState({});
    const store = useSelector((state)=>state);
   const [doo,setdoo] = useState(true);
   const [ccdata,setccdata] = useState([]);
   const [ccdisplay , setccdisplay] = useState(false);
   const [otherdisplaty , setotherdisplay] = useState(false);
   const [otherdata,setotherdata] = useState([]);
   const [ccmonth , setccmonth] = useState("");
   const [othermonth , setothermonth] = useState("");
   const [err , seterr] = useState(false);
   const [ccshow , setccshow] = useState(false);
   const [sorted,setsort] = useState([]);
   const [subject , setsubject] = useState([]);
   const [othershow , setothershow] = useState(false);
   const [tempdata , settempdata] = useState([]);

    const lenn = clas.length;
    const noclasserror ="you have not been assigned to any classroom yet!";
    const dispatch = useDispatch();
    useEffect(()=>{
      if(lenn!==0){
        setsort([...clas].sort((a, b) => b.sort - a.sort));
       }else{
        seterr(true);
       }
    },[lenn])

    useEffect(()=>{
      if(sorted.length!==0){
      setdoo(true);
      }
    },[sorted])

    useEffect(()=>{
      if(user.data.class.length!==0){
        const obj={
          class:clas,
          depart:user.data.depart,
          percent:store.admin.percent
        }
       dispatch(getdefaulter(obj));
      }
    },[dispatch])

    useEffect(()=>{
       if(Object.keys(store.faculty.ccdef).length!==0){
         setcc(store.faculty.ccdef);
         console.log(store.faculty.ccdef);
       }
    },[store.faculty.ccdef])

    useEffect(()=>{
      setccdisplay(false);
      setccdata([]);
      if(Object.keys(cc).length!==0 && ccmonth!==""){
        const moth = Number(ccmonth);
        if(ccmonth==="Overall"){
          setccdata(cc.overall);
        }else{
           for(var i=0;i<cc.monthly.length;i++){
               if(cc.monthly[i].month===moth){
                console.log(cc.monthly[i].student);
                  setccdata(cc.monthly[i].student);
                  break;
               }
           }
        }
      }
    },[ccmonth])

    useEffect(()=>{
      if(ccdata.length!==0){
        setccdisplay(true);
      }else{
        console.log("hkdbvwjv");
      }
    },[ccdata])

    useEffect(()=>{
        if(Object.keys(store.faculty.otherdef).length!==0){
          setother(store.faculty.otherdef);
          console.log(store.faculty.otherdef);
        }
    },[store.faculty.otherdef])

    const handledeff = async(fac)=>{
         if(fac.sort===1){
          const obj={
             depart :user.data.depart,
             year:fac.year
          }
          setccshow(true);
          settempdata(fac);
          dispatch(getsubjects(obj))
         }else{
          setothershow(true);
         }
         setdoo(false);
    }

    useEffect(()=>{
      if(store.faculty.subject.length!==0){
        setsubject(store.faculty.subject);
      }
    },[store.faculty.subject])

    useEffect(()=>{
      console.log(subject);
    },[subject])

  return (
    <div className="deff" style={{background:"white"}}>
      {err===true && doo===false &&  (
        <span>{noclasserror}</span>
      )}
    { doo === true && err===false && (
        <table className='styled-table'>
        <thead>
         <tr>
               <th className="heading">
                 Sr no.
               </th>
               <th className="heading">
                 Year
               </th>
               <th className="heading">
                 Division
               </th>
               <th className="heading">
                 Subject
               </th>
               </tr>
             </thead>
             <tbody>
       {sorted.map((fac,idx)=>(
            <tr
             key={idx}
             className="cont"  onClick={()=>
              handledeff(fac)} >
       <td
            className="cont">
                  {idx + 1} 
            </td>
          <td
         className="cont">
    {fac.year}
      </td>
         <td
          className="cont">
         {fac.division}
              </td>
<td
className="cont">
{fac.subject}
</td>
</tr>
    ) )}
        </tbody>
   </table>
    )
    }

    {doo===false && ccshow===true &&(
      <div className="ccdisplay">
      <div className="upperpartt">
       <ArrowBackIcon onClick={(e)=>{
        setccshow(false);
        setdoo(true);
        setccdata([]);
        setccmonth("");
     }}/>
     </div>
     <div className="downcontent">
       <h1>{tempdata.year}nd Year {tempdata.division} Defualter List</h1>

       <div className="form-group">
                  <h1 className="section">Month :</h1>
                  <Select 
                    required
                    displayEmpty
                    sx={{ height: 36 }}
                    defaultValue=""
                    inputProps={{ "aria-label": "Without label" }}
                    value={ccmonth}
                    onChange={(e) =>{
                      setccmonth(e.target.value)
                    }
                    }>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Overall">Overall</MenuItem>
                    <MenuItem value="1">jan</MenuItem>
                    <MenuItem value="2">feb</MenuItem>
                    <MenuItem value="3">mar</MenuItem>
                    <MenuItem value="4">apr</MenuItem>
                    <MenuItem value="5">may</MenuItem>
                    <MenuItem value="6">jun</MenuItem>
                    <MenuItem value="7">jul</MenuItem>
                    <MenuItem value="8">aug</MenuItem>
                    <MenuItem value="9">sep</MenuItem>
                    <MenuItem value="10">oct</MenuItem>
                    <MenuItem value="11">nov</MenuItem>
                    <MenuItem value="12">dec</MenuItem>
                  </Select>
                </div>
     {ccdisplay===true && ccdata.length!==0 && (
       <table className='styled-table'>
        <thead>
         <tr>
               <th className="heading">
                 Sr no.
               </th>
               <th className="heading">
                 Student
               </th>
               <th className="heading">
                 Rollno
               </th>
               {subject?.map((sub,idx)=>(
                <th className="heading" Key={idx}>
                   {sub.short}
                </th>
               ))}
               <th className="heading">
                 Overall
               </th>
               </tr>
             </thead>
             <tbody>
       {ccdata?.map((fac,idx)=>(
            <tr
    key={idx}
             className="cont">
   <td
            className="cont">
                  {idx + 1} 
            </td>
          <td
         className="cont">
    {fac.student || ""}
      </td>
         <td
          className="cont">
         {fac.Rollno || ""}
              </td>

         {fac.subjects?.map((subj , iddx)=>(
            <td
            className="cont" Key={iddx}>
           {subj.percent || "0"}
                </td>
         ))}
          <td
          className="cont">
         {fac.overall || "0"}
              </td>
</tr>
    ) )}
        </tbody>
   </table> 
     )
    }      
     </div>
     </div>
    )}

     {doo===false && othershow===true && (
          <div className="upperpartt">
          <ArrowBackIcon onClick={(e)=>{
           setothershow(false);
           setdoo(true);
           setotherdata([]);
           setothermonth("");
        }}/>
        </div>
     )}






    </div> 
  );
}

export default Body