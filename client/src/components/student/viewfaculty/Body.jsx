import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Viewfaculty } from '../../../redux/action/studentaction'

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const [error , seterror] = useState({})
  const [facul , setfacul] = useState([])
  const dispatch = useDispatch();
  const store = useSelector((state)=>state)
  
  useEffect(()=>{
     seterror(store.student.viewfacultyerror)
     setfacul([]);
  },[store.student.viewfacultyerror])

  const data = { division:user.data.division , year:user.data.year}

  useEffect(()=>{
     dispatch(Viewfaculty(data))
},[dispatch])

  useEffect(()=>{
    setfacul(store.student.faculties)
    console.log(store.student.faculties);
    seterror({})
  },[store.student.faculties])

  return (
         <div className="faculties" style={{background:"white"}}>  
            <span>{error.facultyerror || error.backenderror}</span>
            {Object.keys(error).length === 0 && (
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
                             <th className="heading">
                               Subject
                             </th>
                             </tr>
                           </thead>
                           <tbody>
                      {facul?.map((fac,idx)=>(
                      <tr
                      key={idx}
                      className="cont">
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
                      <td
                      className="cont">
                      {fac.subject}
                      </td>
                      </tr>
                      
                      ) )}
                      </tbody>
                      </table>
            )}
         </div>
      );
}

export default Body;

{/*  */}


{/* <div className="list-item">
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
       <h1 className="heading">
         Subject
       </h1>
     </div>
{facul?.map((fac,idx)=>(
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
<h1
className="cont">
{fac.subject}
</h1>
</div>

) )}
</div> */}