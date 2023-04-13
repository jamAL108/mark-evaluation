import React , {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getdefaulter } from '../../../redux/action/facultyaction';
const Body = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const clas = user.data.class;
    const [other,setother] = useState([]);
    const [cc,setcc] = useState([]);
    const store = useSelector((state)=>state);
   const [doo,setdoo] = useState(false);
    const sorted = [...clas].sort((a, b) => b.sort - a.sort);
    const lenn = user.data.class.length;
    
     if(lenn!==0){
         setdoo(true);
     } 
    useEffect(()=>{
      if(user.data.class.length!==0){
        const obj={
          class:sorted,
          depart:user.data.depart,
          percent:store.admin.percent
        }
       dispatch(getdefaulter(obj));
      }
    },[dispatch])


    useEffect(()=>{
       if(store.faculty.ccdef.length!==0){
         setcc(store.faculty.ccdef);
         console.log(store.faculty.ccdef);
       }
    },[store.faculty.ccdef])

    useEffect(()=>{
        if(store.faculty.otherdef.length!==0){
          setother(store.faculty.otherdef);
          console.log(store.faculty.otherdef);
        }
    },[store.faculty.otherdef])

    const handledeff = async(fac)=>{
         if(fac.sort===1){
           
         }
    }

  return (
    <div className="deff">
    { doo === true && (
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
             className="cont" onClick={handledeff(fac)}   >
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
    </div> 
  );
}

export default Body