import React, { useEffect , useState } from 'react'
import './body.css';
import { useDispatch, useSelector } from 'react-redux';
import { GET_MARKS, GET_MARKS_ERROR } from '../../../redux/actiontype';
import  Error  from '../../../images/error.png';
import { getmarks } from '../../../redux/action/studentaction.js';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [display , setdisplay] = useState(false);
  const store = useSelector((state)=>state);
  const [marks , setmarks] = useState([]);
  const dispatch = useDispatch();
  const [error, seterror] = useState({})
  const [vale , setvale] = useState({
    name:user.data.name,
    _id:user.data._id,
    year:user.data.year,
    depart:user.data.depart,
    exam:"",
    division:user.data.division
  })
  
  useEffect(()=>{
    if(Object.keys(store.student.getmarkerror).length!==0){
      seterror(store.student.getmarkerror)
      setdisplay(false);
    }
},[store.student.getmarkerror])

  useEffect(()=>{
    if(store.student.marks.length!==0){
    setmarks(store.student.marks)
    setdisplay(true);
    }
},[store.student.marks])

  useEffect(()=>{
    if(vale.exam!==''){
    seterror("");
    console.log(vale);
    dispatch({type:GET_MARKS , payload:[]})
    dispatch({type:GET_MARKS_ERROR , payload:{}})
    dispatch(getmarks(vale))
    }
  },[vale.exam])

  return (
    <div className="studentsmarks" >
      <div className="exams">
        <button className='bttttn' onClick={(e)=>{
          e.preventDefault();
          setvale({...vale , exam:"IA"})
          seterror("");
      }}>IA</button>
        <button className='bttttn' onClick={(e)=>{
          e.preventDefault();
          setvale({...vale , exam:"MIDSEM"})
          console.log(vale);
          seterror("");
          }}>MIDSEM</button>
        <button className='bttttn' onClick={(e)=>{
          e.preventDefault();
          setvale({...vale , exam:"PRACTICAL"})
          seterror("");
          }}>PRACTICAL</button>
        <button className='bttttn' onClick={(e)=>{
          e.preventDefault();          
          setvale({...vale , exam:"ENDSEM"})
          seterror("");
          }}>ENDSEM</button>
      </div>
      {display===false && marks.length===0 && Object.keys(error).length!==0  && (
      <div className="error">
         <div className="error">
            <h1><ErrorOutlineRoundedIcon className='icon' /> {error.markerror}</h1>
            </div>
     </div>
     )}
     { display===true && Object.keys(error).length===0 && marks.length!==0 && (
      <div className="marks">
         {/* <h1>{vale.exam} : marks</h1> */}
         <div className="tablee">
           <table >
           <tr id='headering'>
             <th className="heading">
                         Sr no.
                        </th>
                <th className="heading">
                          subject name
                        </th>
                                 <th className="heading">
                                   subject code 
                                 </th>
                                 <th className="heading">
                                   Mark
                                 </th>
                                 <th className="heading">
                                   Total Mark
                                 </th>
                                 </tr>
                         {marks?.map((mark,idx)=>(
                <tr
                      key={idx}
                  className="cont">
                     <td
                   className="cont">
                   {idx + 1}
                  </td>
                  <td
                  className="cont">
                  {mark.subject}
                     </td>
                     <td
                 className="cont">
                 {mark.subjectCode}
                 </td>
                 <td
                 className="cont">
                   {mark.mark}
                 </td>
                 <td
                 className="cont">
                   {mark.totalmark}
                 </td>
                 </tr>
                      ) )}
                     </table>
                     </div>
                 </div>
     )}
    
    </div>
  )
}

export default Body;