import React, { useEffect , useState } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { GET_MARKS, GET_MARKS_ERROR } from '../../../redux/actiontype';

import { getmarks } from '../../../redux/action/studentaction.js';

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
    seterror(store.student.getmarkerror)
},[store.student.getmarkerror])

  useEffect(()=>{
    setmarks(store.student.marks)
},[store.student.marks])

  useEffect(()=>{
    console.log(vale);
    dispatch({type:GET_MARKS , payload:[]})
    dispatch({type:GET_MARKS_ERROR , payload:{}})
    dispatch(getmarks(vale))
  },[vale.exam])

  return (
    <div className="studentsmarks" style={{background:"white"}}>
      <div className="exams">
        <button onClick={(e)=>{
          setvale({...vale , exam:"IA"})
          setdisplay(true)
      }}>IA</button>
        <button onClick={(e)=>{
          setvale({...vale , exam:"MIDSEM"})
          setdisplay(true)
          console.log(vale);
          }}>MIDSEM</button>
        <button onClick={(e)=>{
          setvale({...vale , exam:"PRACTICAL"})
          setdisplay(true)
          }}>PRACTICAL</button>
        <button onClick={(e)=>{
          setvale({...vale , exam:"ENDSEM"})
          setdisplay(true)
          }}>ENDSEM</button>
      </div>
     <span>{error.backenderror || error.markerror}</span>
     {display===true && (
      <div className="marks">
         <h1>{vale.exam} : marks</h1>
           <table className='styled-table'>
             <thead>
              <tr>
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
                                 </thead>
                               <tbody>
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
                          </tbody>
                     </table>
                 </div>
     )}
    
    </div>
  )
}

export default Body;