import React, { useEffect , useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getnotice } from '../../redux/action/studentaction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
function Notice() {
  const [error , seterror] = useState({});
  const store = useSelector((state)=>state);
  const [noticeswitch , setnoticeswitch] = useState(false);
  const [headnotice , setheadnotice] = useState([]);
  const [notice , setnotice] = useState({});
  const dispatch = useDispatch();
  const [display ,setdisplay]=useState(false);
  const array=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
  useEffect(()=>{
    if(Object.keys(store.student.getnoticeerror).length!==0){
    seterror(store.student.getnoticeerror);
    setdisplay(false);
    }
  },[store.student.getnoticeerror])
  
  useEffect(()=>{
    if(store.student.notice.length!==0){
     setheadnotice(store.student.notice);
     console.log(store.student.notice);
     setdisplay(true);
    }
      },[store.student.notice])


      useEffect(()=>{
        for(var i=0;i<headnotice;i++){
          const months = headnotice[i].date.split("-");
          console.log(months);
          const month = months[1];
          console.log(month);
        }
      },[headnotice])
  
  useEffect(()=>{
     dispatch(getnotice());
  },[dispatch])

  return (
<>
      <div className="headdd">
      <h1>Notice</h1>
      </div>
      {display===false && (
      <div className="error">
      <ErrorOutlineRoundedIcon className='icon' />
      <h1>{error.noticeerror}</h1>
      </div>
      )}
      {display===true && noticeswitch===false && Object.keys(error).length === 0 &&(
      <div className="headercont">

      {headnotice?.map((fac,idx)=>(
        <div className='toast' onClick={(e)=>{
          setnoticeswitch(true)
          setnotice(fac);
        }}>
     <h1>{idx+1}</h1>     
     <h1
     className="cont">
     From: {fac.from}
        </h1>
        <h1
    className="cont">
    {fac.topic}
    </h1>
    <h1
    className="cont">
    Date: {fac.date}
    </h1>
    </div>
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
      <h1> From : {notice.from}</h1>
      <h1>{notice.topic}</h1>
      <h1>  Date : {notice.date}</h1>
    </div>
    <div className="downpart">
      <p>{notice.content}</p>
    </div>
   </div>
) }
  </>
)
}

export default Notice;