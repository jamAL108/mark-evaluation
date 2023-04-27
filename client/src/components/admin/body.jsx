import React, { useEffect , useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_DONE, CHANGE_TIMER } from '../../redux/actiontype';
import Schedule from 'react-schedule-job'
import { monthlydefaulter , upgradeyear , changetoodd , changetoeven , changeper} from '../../redux/action/adminaction'; 
import { ODD_SEM_UPDATE , EVEN_SEM_UPDATE , YEAR_UPDATE , DEFAULTER_PERCENT } from '../../redux/actiontype';
function Body(){
  const user = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();
    const store = useSelector((state)=>state);
    const [percent , setpercent] = useState({
      per:user.data.defpercent
    });
    console.log(user.data);
    const [sendotp , setsendotp] = useState(false);
    const [sendotp1 , setsendotp1] = useState(false);
    const [otp , setotp] = useState(false);
    const [temp , settemp] = useState(percent.per);
    const [unlockyear , setunlockyear] = useState(user.data.upgradeyear);
    const [unlockodd , setunlockodd] = useState(user.data.startoddsem);
    const [unlockeven , setunlockeven] = useState(user.data.startevensem);


    useEffect(()=>{
       if(store.admin.percentchanges){
        dispatch({type:CHANGE_DONE , payload:false});
       }
    },[store.admin.percentchanges])

    const upgradeyer =async(e)=>{
      // e.preventDefault();
      dispatch(upgradeyear());
    };
    
    const upgradodd= async(e)=>{
      // e.preventDefault();
      dispatch(changetoodd());
   };
   const upgradeven= async(e)=>{
    // e.preventDefault();
    dispatch(changetoeven());
 };

    useEffect(()=>{
      if(store.admin.yearupdated===true){
      setunlockodd(true);
      user.data.startoddsem=true;
      setunlockyear(false);
      user.data.upgradeyear=false;
      localStorage.setItem("user",JSON.stringify(user));
      dispatch({type:YEAR_UPDATE , payload:false});
      }
    },[store.admin.yearupdated])

    useEffect(()=>{
      if(store.admin.semupdated===true){
      setunlockeven(true);
      user.data.startevensem=true;
      setunlockodd(false);
      user.data.startoddsem=false;
      localStorage.setItem("user",JSON.stringify(user));
      dispatch({type:ODD_SEM_UPDATE , payload:false});
      }
    },[store.admin.oddsemupdated])

    useEffect(()=>{
      if(store.admin.semupdated===true){
      setunlockyear(true);
      user.data.upgradeyear=true;
      setunlockeven(false);
      user.data.startevensem=false;
      localStorage.setItem("user",JSON.stringify(user));
      dispatch({type:EVEN_SEM_UPDATE , payload:false});
      }
    },[store.admin.evensemupdated])

    const function_1 = () => {
      console.log(user.data.defpercent);
      const obj = {
        per:user.data.defpercent
      }
      console.log("why brrooo");
      console.log(obj);
      dispatch(monthlydefaulter(obj));
    };
    
  const jobs = [
        {
          fn: function_1,
          id: '1',
          schedule: '0 0 1 * *',
        }
  ];

    return(
    <div className="body">
             <Schedule 
        jobs={jobs}
        timeZone='UTC'
        dashboard={{ hidden: true }}
      />
      <div className="attendance-percent">
         <h1>monthly defaulter will be released according to the percentage mentioned here</h1>
         <input type="text" name="percent" id="age" autoComplete='off' className="form-control" value={temp} onChange={(e)=>{
           settemp(e.target.value) 
     }} />
        <button onClick={(e)=>{
           if(percent.per!==temp){
            const obj={
              percent:temp
            }
            console.log(obj);
          dispatch(changeper(obj));
          user.data.defpercent=temp;
          localStorage.setItem("user",JSON.stringify(user));
          setpercent({
            per:temp
          })
          }
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