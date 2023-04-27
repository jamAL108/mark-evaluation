import React , {useEffect, useState} from 'react'
import './body.css';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [error , seterror] = useState("");
  const [display , setdisplay]=useState(false);
  
  useEffect(()=>{
    if(user.data.class.length===0){
      setdisplay(false);
      seterror("You have not being yet initialized with any class pls contact the admin...!");
    }else{
      setdisplay(true);
    }
  },[user])

  console.log("hello")
  console.log(user.data.class.length);
  return (
    <div className="dabbaa">
     <div className="content">
        <h1>My Classrooms :</h1>
            </div>
     { display===false && (          
            <div className="error">
            <h1><ErrorOutlineRoundedIcon className='icon' />{error}</h1>
            </div>)}
      {display===true && (
        <div className="tablee">
                  <table>
                       <tbody>
                       <tr id='headering'>
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
                 {user.data.class.map((fac,idx)=>(      
        <tr
              key={idx}
          className="cont">
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
             </div>
      )}
      </div>
    
  )
}

export default Body;