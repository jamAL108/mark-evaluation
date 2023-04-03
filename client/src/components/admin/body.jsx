import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_TIMER } from '../../redux/actiontype';
import { monthlydefaulter , upgradeyear , changetoodd , changetoeven } from '../../redux/action/adminaction'; 
import { ODD_SEM_UPDATE , EVEN_SEM_UPDATE , YEAR_UPDATE , DEFAULTER_PERCENT } from '../../redux/actiontype';
function Body(){
    const dispatch = useDispatch();
    const store = useSelector((state)=>state);
    const [percent , setpercent] = useState({
      per:75
    });
    const [sendotp , setsendotp] = useState(false);
    const [sendotp1 , setsendotp1] = useState(false);
    const [otp , setotp] = useState(false);
    const [temp , settemp] = useState(percent.per);
    const [unlockyear , setunlockyear] = useState(true);
    const [unlockodd , setunlockodd] = useState(false);
    const [unlockeven , setunlockeven] = useState(false);


    useEffect(()=>{
      const date = new Date();
       const dat = date.getDate();
       if(dat!==store.admin.timer){
          dispatch(monthlydefaulter(store.admin.percent.per));
          dispatch({type:CHANGE_TIMER , payload:dat});
       }
    },[dispatch])


    useEffect(()=>{
     dispatch({type:DEFAULTER_PERCENT , payload:percent});
    },[percent.per])
    const upgradeyer =async(e)=>{
      e.preventDefault();
      dispatch(upgradeyear());
    };
    
    const upgradodd= async(e)=>{
      e.preventDefault();
      dispatch(changetoodd());
   };
   const upgradeven= async(e)=>{
    e.preventDefault();
    dispatch(changetoeven());
 };

    useEffect(()=>{
      if(store.admin.yearupdated===true){
      setunlockodd(true);
      setunlockyear(false);
      dispatch({type:YEAR_UPDATE , payload:false});
      }
    },[store.admin.yearupdated])

    useEffect(()=>{
      if(store.admin.semupdated===true){
      setunlockeven(true);
      setunlockodd(false);
      dispatch({type:ODD_SEM_UPDATE , payload:false});
      }
    },[store.admin.oddsemupdated])

    useEffect(()=>{
      if(store.admin.semupdated===true){
      setunlockyear(true);
      setunlockeven(false);
      dispatch({type:EVEN_SEM_UPDATE , payload:false});
      }
    },[store.admin.evensemupdated])


    return(
    <div className="body">
      
      <div className="attendance-percent">
         <h1>monthly defaulter will be released according to the percentage mentioned here</h1>
         <input type="text" name="percent" id="age" autoComplete='off' className="form-control" value={temp} onChange={(e)=>{
           settemp(e.target.value) 
     }} />
        <button onClick={(e)=>{
           setpercent({per:temp});
        }}>change</button>       
      </div>
       <div className="sem-schedule">

        <div className="upgrade">
        {unlockyear===true && (
          <button onClick={(e)=>{
            upgradeyer()}}>Upgrade Year</button>  
            )
          }
       </div>

      <div className="start-sem">

        {unlockodd===true && (
          <button onClick={(e)=>{
           upgradodd()
          }}>Start odd sem</button>
        )
        }

       {unlockeven===true && (
          <button onClick={(e)=>{
           upgradeven()
          }}>Start odd sem</button>
        )
        }

       </div>
      </div> 
    </div>
    );
}
export default Body;














// {sendotp===true &&(
//   <form action="POSt" onSubmit={sendotp}>
//     <h1>OTP CONFIRMATION</h1>
//     <h3>An six digit confirmation otp will be sended to your email</h3>
//     <button type='submit'>Send OTP</button>
//   </form>
// )}  