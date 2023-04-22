import React , {useState} from 'react'
import './body.css';
const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [error , seterror] = useState("");
  console.log("hello")
  console.log(user.data.class.length);
  if(user.data.class.length===0){
    seterror("You have not being yet initialized with any class pls contact the admin");
  }
  return (
    <div className="dabba" style={{background:"white"}}>
      <span>{error}</span>
      {error==="" && (
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
      )}
    </div>
    
  )
}

export default Body;