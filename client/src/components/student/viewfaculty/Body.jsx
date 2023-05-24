import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Viewfaculty } from '../../../redux/action/studentaction'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import './body.css';
const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [error , seterror] = useState({})
  const [facul , setfacul] = useState([])
  const [display,setdisplay]=useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state)=>state)
  
  useEffect(()=>{
    if(Object.keys(store.student.viewfacultyerror).length!==0){
     seterror(store.student.viewfacultyerror)
     setfacul([]);
    }
  },[store.student.viewfacultyerror])

  const data = { division:user.data.division , year:user.data.year}

  useEffect(()=>{
     dispatch(Viewfaculty(data))
},[dispatch])

   useEffect(()=>{
    console.log(error);
   },[error])

  useEffect(()=>{
    if(store.student.faculties.length!==0){
    setfacul(store.student.faculties)
    console.log(store.student.faculties);
    seterror({})
    setdisplay(true);
    }
  },[store.student.faculties])

  return (
         <div className="faculties" >
         <div className="content">
            <h1>My faculties :</h1>
            </div>
            { display===false && (          
            <div className="error">
            <h1><ErrorOutlineRoundedIcon className='icon' /> {error.facultyerror || error.backenderror}</h1>
            </div>)}
            { Object.keys(error).length === 0 && display===true && (
              <div className="tablee">
                      <table>
                           <tr id='headering'>
                             <th className="heading">
                               Sr no.
                             </th>
                             <th className="heading">
                               Name
                             </th>
                             <th className="heading">
                               Email
                             </th>
                             <th className="heading">
                               Subject
                             </th>
                             </tr>
                      {facul?.map((fac,idx)=>(
                      <tr
                      key={idx}
                      className="cont">
                      <td
                      className="cont">
                      {idx + 1}
                      </td>
                      <td
                      className="name">
                      {fac.name}
                      </td>
                      <td
                      className="cont">
                      {fac.email}
                      </td>
                      <td
                      className="cont">
                      {fac.subject}
                      </td>
                      </tr>
                      
                      ) )}
                      </table>
                      </div>
            )}
         </div>
      );
}

export default Body;
