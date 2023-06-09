import React ,{useEffect, useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import {getstudent , uploadmark } from '../../../redux/action/facultyaction.js';
import { MARKS_UPLOADED, MARKS_UPLOAD_ERROR, T_GET_ALL_STUDENT , T_GET_ALL_STUDENT_ERROR } from '../../../redux/actiontype.js';
import './body.css';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const clas =user.data.class;
  const [maindisplay , setmaindisplay]=useState(false);
  const [cond , setcond] = useState(false);
  const [display , setdisplay] = useState(false);
  const [marks , setmarks] = useState([]);
  const [practical , setpractical] = useState(false);
  const [datafrprac , setdatafrprac] = useState(false); 
  const [creditswitch , setcreditswitch] = useState(false); 
  const [value , setvalue] = useState({
    depart:user.data.depart,
    year:"",
    division:"",
    subject:"",
    exam:"",
    practical:false,
    credits:false
  });
  const [error , seterror] =useState({});
  const store = useSelector((state)=>state)
  const dispatch = useDispatch();
  let ownerror ="You have not being yet initialized with any class pls contact the admin...!";
  const [students , setstudents] = useState([]);
  const [uploaderror , setuploaderror] = useState({})
  const [arraymark , setarraymark] = useState([]);
  const [arraypractermmark , setarraypractermmark] = useState([]);
  const [arraypracoralmark , setarraypracoralmark] = useState([]);
  const [arraycreditmark , setarraycreditmark] = useState([]);
  const [loader,setloader] =useState(false);

  const arr = ["GE","FE","SE","TE","BE"];
  useEffect(()=>{
    seterror(store.faculty.getstudenterror)
  },[store.faculty.getstudenterror])

  useEffect(()=>{
     setstudents(store.faculty.students);
     setloader(false);
  },[store.faculty.students])



  useEffect(()=>{
    if(user.data.class.length!==0){
      setmaindisplay(true);
    }else{
      setmaindisplay(false);
    }
  },[user])


// mark updating into states
  useEffect(()=>{
    let array=[];
    array.push(0);
    let practerm=[];
    practerm.push(0);
    let pracoral=[];
    pracoral.push(0);
    let creditss =[];
    creditss.push(0);


    for(let i=0;i<students.length;i++){
      array.push(students[i].mark);
    }
    setarraymark(array);
    
    for(let i=0;i<students.length;i++){
      practerm.push(students[i].termmarks);
    }
    setarraypractermmark(practerm)

    for(let i=0;i<students.length;i++){
      pracoral.push(students[i].orals);
    }
    setarraypracoralmark(pracoral);
    
    for(let i=0;i<students.length;i++){
      creditss.push(students[i].credits);
    }
    setarraycreditmark(creditss);
    
},[students])



// targte value being updated at the same time
  const markvalue =(id , value)=>{
    arraymark[id]=value;
    setarraymark(arraymark);
  }
  const termvalue =(id , value)=>{
    arraypractermmark[id]=value;
    setarraypractermmark(arraypractermmark);
  }
  const oralvalue =(id , value)=>{
    arraypracoralmark[id]=value;
    setarraypracoralmark(arraypracoralmark);
  }
  const creditvalue =(id,value)=>{
    arraycreditmark[id]=value;
    setarraycreditmark(arraycreditmark);
  }

  


  //exam value being changed
  useEffect(()=>{
    dispatch({type:T_GET_ALL_STUDENT , payload:[]})
    dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
    setmarks([])
    if(value.exam!=="PRACTICAL"){
      setdatafrprac(false);
    }
    if(value.exam==="PRACTICAL"){
      setdatafrprac(true);
    }
    if(value.exam!=="CREDITS"){
      setcreditswitch(false);
    }else if(value.exam==="CREDITS"){
      setcreditswitch(true);
    }
    setstudents({})
     dispatch(getstudent(value))
     setloader(true);
  },[value.exam])



//// handling marks input handleinput - marks , hanldeinput1 - termwork practical , handleinput2  - orals 
  const handleinput = (_id , value) =>{
    let newMarks = [...marks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setmarks(newMarks);
  }



  const [termmarks , settermmarks] = useState([])
  const handleinput1 = (_id , value) =>{
    let newMarks = [...termmarks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    settermmarks(newMarks);
  }
  const [oralmarks , setoralmarks] = useState([])
  const handleinput2 = (_id , value) =>{
    let newMarks = [...oralmarks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setoralmarks(newMarks);
  }

  const [creditmarks,setcreditmarks] = useState([])
  const handleinput3 = (_id , value) =>{
    let newMarks = [...creditmarks];
    let index = newMarks.findIndex((m) => m._id === _id);
    if (index === -1) {
      newMarks.push({ _id, value });
    } else {
      newMarks[index].value = value;
    }
    setcreditmarks(newMarks);
  }






////main code
  const uploadmarks = async(e)=>{
    e.preventDefault();
    const uploadingdata={
      depart:value.depart , year:value.year , division:value.division , subject:value.subject , marks:marks , exam:value.exam , termmarks:termmarks , 
      oralmarks:oralmarks , practical:value.practical , creditmarks:creditmarks , credits:value.credits
    }
    console.log(uploadingdata);
    dispatch(uploadmark(uploadingdata))
  }



////error detection
  useEffect(()=>{
    setuploaderror(store.faculty.marksuploaderror)
  },[store.faculty.marksuploaderror])





  /// removing all data from states ones marks being uploaded so that next time everything remains newww
  useEffect(()=>{
     setstudents({})
     dispatch({type:MARKS_UPLOADED , payload:false})
     dispatch({type:MARKS_UPLOAD_ERROR
      , payload:{}})
      setcond(false);
      setdatafrprac(true);
      setvalue({...value , year:"", division:"",subject:"",exam:"" , practical :false
    });
    setmarks([])
    setarraymark([])
    setpractical(false);
    setcreditswitch(false);
    setarraypractermmark([])
    setarraypracoralmark([])
    setarraycreditmark([])
    settermmarks([])
    setmarks([])
    setoralmarks([])
    setcreditmarks([])
    dispatch({type:T_GET_ALL_STUDENT , payload:[]})
    dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
  },[store.faculty.markuploaded])




////jsx coddeee
  return (
    <div className="uploadmark">
           {loader==true && (
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        )} 
    {maindisplay===false && (
     <div className="uppererror">
             <div className="content">
               <h1>My Classrooms :</h1>
                  </div>
       <div className="error">
      <h1><ErrorOutlineRoundedIcon className='icon' />{ownerror}</h1>
          </div>
          </div>
    )}
    {maindisplay===true && (
    <div className="mark">
       {cond===false  && (
        <div className="dabba">
                 <div className="content">
               <h1>My Classrooms :</h1>
                  </div>
        <div className="tablee">
          <table>
            <tr id='headering'>
              <th>Sr no.</th>
              <th>Year</th>
              <th>Division</th>
              <th>Subject</th>
            </tr>
            <tbody>
            {clas?.map((dat,idx)=>(
             <tr key={idx} onClick={(e)=>{
              e.preventDefault();
                setcond(true)
                setdisplay(false)
                setvalue({
                  ...value,
                  year:dat.year,
                  division:dat.division,
                  subject:dat.subject,
                })
                if(dat.practical ===true){
                  setpractical(true);
                }else if(dat.praactical===false){
                  setpractical(false);
                }
                const item={
                  depart:user.data.depart,
                  year:dat.year,
                  division:dat.division,
                  subject:dat.subject,
                }
         dispatch(getstudent(item))
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
        </div>
       ) }

      {cond===true && (
          <div className="mainnnn">
                <ArrowBackIcon className='icon' onClick={(e)=>{
               setcond(false);
               setvalue({...value , year:"", division:"",subject:"",exam:"" , practical:false
              });
              setdisplay(false)
               setstudents([])
               setdatafrprac(false);
               setmarks([])
               setarraymark([])
               setpractical(false);
               setcreditswitch(false);
               settermmarks([])
               setoralmarks([])
               setarraypractermmark([])
               setarraypracoralmark([])
               setarraycreditmark([])
               setcreditmarks([])
               dispatch({type:T_GET_ALL_STUDENT , payload:[]})
               dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
      }}/>
      
      <div className="info">
        <h1>{arr[value.year]} {value.division} Division , {value.subject} : </h1>
      </div>

      <div className="exams">
        <button className="btn" onClick={()=>{
          setvalue({...value , exam:"IA" , practical:false , credits:false})
          setdisplay(true)
          setdatafrprac(false);
      }}>IA</button>

        <button className="btn" onClick={(e)=>{
          setvalue({...value , exam:"MIDSEM"  , practical:false , credits:false})
          setdisplay(true)
          setdatafrprac(false);
          }}>MIDSEM</button>

    {practical===true && (
        <button className="btn" onClick={(e)=>{
          setvalue({...value , exam:"PRACTICAL" , practical:true ,  credits:false})
          setdisplay(true)
          setdatafrprac(true);
          }}>PRACTICAL</button>
      )
        }

        <button className='btn' onClick={(e)=>{
          setvalue({...value , exam:"ENDSEM"  , practical:false ,  credits:false})
          setdisplay(true)
          setdatafrprac(false);
          }}>ENDSEM</button>

        <button className="btn" onClick={(e)=>{
          setvalue({...value , exam:"CREDITS"  , practical:false ,  credits:true})
          setdisplay(true)
          setdatafrprac(false);
          setcreditswitch(true);
          }}>CREDITS</button>

      </div>

       {display===true && datafrprac===false && creditswitch===false && (
        <div className="marks">
         <h1>{value.exam} : marks</h1>
         <div className="tablee">
         <table>
                   <tr id='headering'>
                         <th>
                           Sr no.
                         </th>
                         <th>
                           Rollno
                         </th>
                         <th>
                           Name
                         </th>
                         <th>
                           Marks
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
          <input type="Number" value={ arraymark[idx+1] || "" } onChange={(e)=>{handleinput(student._id , e.target.value)
          console.log(idx+1);
          console.log(arraymark[idx+1])
           markvalue(idx+1 , e.target.value)
          } }/>
         </td>
         </tr>
              ) )}
                  </tbody>
             </table>
             </div>
             <div className="hey">
             <button className='bts' onClick={uploadmarks}>Upload marks</button>
         </div>
         </div>
       )}


        {display===true && datafrprac===true && creditswitch===false && (
        <div className="marks">
         <h1>{value.exam} : marks</h1>
         <div className="tablee">
         <table>

                   <tr id='headering'>
                         <th >
                           Sr no.
                         </th>
                         <th >
                           Rollno
                         </th>
                         <th >
                           Name
                         </th>
                         <th >
                           Term work
                         </th>
                         <th >
                           Orals
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
          <input type="Number" value={ arraypractermmark[idx+1] || "" } onChange={(e)=>{handleinput1(student._id , e.target.value)
           termvalue(idx+1 , e.target.value)
          } }/>
         </td>
         <td
         className="cont">
          <input type="Number" value={ arraypracoralmark[idx+1] || "" } onChange={(e)=>{handleinput2(student._id , e.target.value)
           oralvalue(idx+1 , e.target.value)
          } }/>
         </td>
         </tr>
              ) )}
                  </tbody>
             </table>
             </div>
             <div className="hey">
             <button className='bts' onClick={uploadmarks}>Upload marks</button>
             </div>
         </div>
       )}




{display===true && datafrprac===false && creditswitch===true && (
        <div className="marks">
         <h1>{value.exam} : marks</h1>
         <div className="tablee">
         <table>
                   <tr id='headering'>
                         <th>
                           Sr no.
                         </th>
                         <th>
                           Rollno
                         </th>
                         <th>
                           Name
                         </th>
                         <th>
                           Credits
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
          <input type="Number" value={ arraycreditmark[idx+1] || "" } onChange={(e)=>{handleinput3(student._id , e.target.value)
           creditvalue(idx+1 , e.target.value)
          } }/>
         </td>

         </tr>
              ) )}
                  </tbody>
             </table>
             </div>
             <div className="hey">
             <button className='bts' onClick={uploadmarks}>Upload marks</button>
         </div>
         </div>
       )}
      

          </div>
      )}



</div>
)}
</div>
  )
}

export default Body;