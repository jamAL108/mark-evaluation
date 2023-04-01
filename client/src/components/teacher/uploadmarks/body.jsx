import React ,{useEffect, useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useSelector} from 'react-redux';
import { useDispatch } from 'react-redux';
import {getstudent , uploadmark } from '../../../redux/action/facultyaction.js';
import { MARKS_UPLOADED, MARKS_UPLOAD_ERROR, T_GET_ALL_STUDENT , T_GET_ALL_STUDENT_ERROR } from '../../../redux/actiontype.js';

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const clas =user.data.class;
  const [cond , setcond] = useState(false);
  const [display , setdisplay] = useState(false);
  const [marks , setmarks] = useState([]);
  const [value , setvalue] = useState({
    depart:user.data.depart,
    year:"",
    division:"",
    subject:"",
    exam:""
  });
  const [error , seterror] =useState({});
  const store = useSelector((state)=>state)
  const dispatch = useDispatch();
  const [students , setstudents] = useState([]);
  const [uploaderror , setuploaderror] = useState({})
  const [arraymark , setarraymark] = useState([]);
  useEffect(()=>{
    seterror(store.faculty.getstudenterror)
  },[store.faculty.getstudenterror])

  useEffect(()=>{
     setstudents(store.faculty.students);
  },[store.faculty.students])


  useEffect(()=>{
    let array=[];
    array.push(0);
    for(let i=0;i<students.length;i++){
      array.push(students[i].mark);
    }
    setarraymark(array);
    for(let j=0;j<arraymark.length;j++){
    }
},[students])


  const markvalue =(id , value)=>{
    arraymark[id]=value;
    setarraymark(arraymark);
  }
  
  useEffect(()=>{
    dispatch({type:T_GET_ALL_STUDENT , payload:[]})
    dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
    setmarks([])
    setstudents({})
     dispatch(getstudent(value))
  },[value.exam])


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


  const uploadmarks = async(e)=>{
    e.preventDefault();
    const uploadingdata={
      depart:value.depart , year:value.year , division:value.division , subject:value.subject , marks:marks , exam:value.exam
    }
    dispatch(uploadmark(uploadingdata))
  }

  useEffect(()=>{
    setuploaderror(store.faculty.marksuploaderror)
  },[store.faculty.marksuploaderror])


  useEffect(()=>{
     setstudents({})
     dispatch({type:MARKS_UPLOADED , payload:false})
     dispatch({type:MARKS_UPLOAD_ERROR
      , payload:{}})
      setcond(false);
      setvalue({...value , year:"", division:"",subject:"",exam:""
    });
    dispatch({type:T_GET_ALL_STUDENT , payload:[]})
    dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
  },[store.faculty.markuploaded])


  return (
    <div className="uploadmark" style={{background:"white"}}>
      <h1>hi im jamal</h1>
       {cond===false  && (
        <div className="select-class">
          {clas?.map((dat,idx)=>(
             <button key={idx} onClick={(e)=>{
              e.preventDefault();
                setcond(true)
                setdisplay(false)
                setvalue({
                  ...value,
                  year:dat.year,
                  division:dat.division,
                  subject:dat.subject
                })
                const item={
                  depart:user.data.depart,
                  year:dat.year,
                  division:dat.division,
                  subject:dat.subject
                }
         dispatch(getstudent(item))
             }}>
               <h1>Year: {dat.year}</h1>
               <h1>Division : {dat.division}</h1>
               <h1>Subject : {dat.subject}</h1>
             </button>
          ))}
        </div>
       ) }

      {cond===true && (
          <div className="main">
                <ArrowBackIcon onClick={(e)=>{
               setcond(false);
               setvalue({...value , year:"", division:"",subject:"",exam:""
              });
              setdisplay(false)
               setstudents([])
               dispatch({type:T_GET_ALL_STUDENT , payload:[]})
               dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:{}})
      }}/>
      <div className="exams">
        <button onClick={()=>{
          setvalue({...value , exam:"IA"})
          setdisplay(true)
      }}>IA</button>
        <button onClick={(e)=>{
          setvalue({...value , exam:"MIDSEM"})
          setdisplay(true)
          }}>MIDSEM</button>
        <button onClick={(e)=>{
          setvalue({...value , exam:"PRACTICAL"})
          setdisplay(true)
          }}>PRACTICAL</button>
        <button onClick={(e)=>{
          setvalue({...value , exam:"ENDSEM"})
          setdisplay(true)
          }}>ENDSEM</button>
      </div>
       
       {display===true && (
        <div className="marks">
         <h1>{value.exam} : marks</h1>
         <table className='styled-table'>
                  <thead>
                   <tr>
                         <th className="heading">
                           Sr no.
                         </th>
                         <th className="heading">
                           Rollno
                         </th>
                         <th className="heading">
                           Name
                         </th>
                         <th className="heading">
                           Marks
                         </th>
                         </tr>
                       </thead>
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
             <button onClick={uploadmarks}>Upload marks</button>
         </div>
       )}
          </div>
      )}



</div>
  )
}

export default Body;