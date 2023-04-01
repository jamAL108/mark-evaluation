import React , {useEffect , useState} from 'react'

import {useSelector , useDispatch} from "react-redux"

const Body = () => {
  const store = useSelector((state)=>state);
  const dispatch = useDispatch();
  const [data , setdata] = useState([]);
  
  return (
     <div className="attendance">     
          
     </div>
  )
}

export default Body;