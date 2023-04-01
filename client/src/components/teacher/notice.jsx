import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getnotice } from '../../redux/action/facultyaction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function Notice() {
  const [error , seterror] = useState({})
  const store = useSelector((state)=>state);
  const [noticeswitch , setnoticeswitch] = useState(false);
  const [headnotice , setheadnotice] = useState([]);
  const [notice , setnotice] = useState({});
  const dispatch = useDispatch();
  
  useEffect(()=>{
    seterror(store.faculty.getnoticeerror);
    console.log(store.faculty.getnoticeerror);
  },[store.faculty.getnoticeerror])
  
  useEffect(()=>{
     setheadnotice(store.faculty.notice)
     console.log(store.faculty.notice);
      },[store.faculty.notice])
  
  useEffect(()=>{
     dispatch(getnotice());
  },[dispatch])

  return (
    <div className="notice" style={{background:"white"}}>
      <h1 className='head'>Notice</h1>
      <h1>{error.noticeerror}</h1>
      {noticeswitch===false && Object.keys(error).length === 0 &&(
      <div className="headercont">
      {headnotice?.map((fac,idx)=>(
        <button onClick={(e)=>{
          setnoticeswitch(true)
          setnotice(fac);
        }}>
   <div
         key={idx}
     className="cont">
        <h1
      className="cont">
      {idx + 1}
     </h1>
     <h1
     className="cont">
     {fac.from}
        </h1>
        <h1
    className="cont">
    {fac.topic}
    </h1>
    <h1
    className="cont">
    {fac.date}
    </h1>
    </div>
    </button>
            ) )}
      </div>
      )
}

{noticeswitch===true && (
   <div className="maincont">
    <div className="upperpart">
      <ArrowBackIcon onClick={(e)=>{
         setnoticeswitch(false)
      }}/>
      <h1>{notice.from}</h1>
      <h1>{notice.topic}</h1>
      <h1>{notice.date}</h1>
    </div>
    <div className="downpart">
      <p>{notice.content}</p>
    </div>
   </div>
) }
    </div>
)
}

export default Notice;