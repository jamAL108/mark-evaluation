import React, { useEffect ,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getresult } from '../../../redux/action/studentaction';

const Body = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const store = useSelector((state)=>state);
  const dispatch =useDispatch();
  const [error,seterror] = useState({});
  const [display,setdisplay]=useState(false);
  const [result , setresult] =useState({});
  const [theory , settheory] = useState([]);
  const [practical , setpractical] = useState([]);
  const [totalmark , settotalmark] = useState(0);
  const [status,setstatus] = useState("Successful");
   
  useEffect(()=>{
    const obj={
      _id:user.data._id
    }
    dispatch(getresult(obj));
  },[dispatch]);

  useEffect(()=>{
    if(Object.keys(store.student.resulterror).length!==0){
      seterror(store.student.resulterror);
      setdisplay(false);
    }
  },[store.student.resulterror]);

  useEffect(()=>{
    if(Object.keys(store.student.result).length!==0){
      setresult(store.student.result);
      console.log(store.student.result);
    }
  },[store.student.result]);

  useEffect(()=>{
    settheory(result.subjects);
    setpractical(result.practical);
    setdisplay(true);
    settotalmark(result.totalsubject*100);
    if(result.kt===true){
      setstatus("Fail");
    }
  },[result]);



return(
  <div className="reefewv" style={{background:"white"}}>
          {display===true  && (
            <div className="mainresult">
              <h2>Name: {user.data.name}</h2>
              <h2>Rollno: {user.data.Rollno}</h2>
              <table>
               <thead>
                <tr>
                <th>Paper code</th>
                <th>Paper name</th>
                <th>AM</th>
                <th>Maximum marks</th>
                <th>Minimum marks</th>
                <th>Marks obtained</th>
                <th>Credits(c)</th>
                <th>Grade</th>
                <th>Grade points(P)</th>
                <th>C x G</th>
                </tr>
               </thead>
               <tbody>
               {theory?.map((fac,idx)=>(
                <React.Fragment>
                  <tr Key={idx} >
                  <td rowspan="4">{fac.subjectCode}</td>
                  <td rowspan="4">{fac.subjectname}</td>
                  <td>ESE</td>
                  <td>{fac.theory.ESE.maximummarks}</td>
                  <td>{fac.theory.ESE.minimummarks}</td>
                  <td>{fac.theory.ESE.marks}</td>
                <td rowspan="4">{fac.credits}</td>
                  <td>{fac.theory.ESE.grade}</td>
                <td rowspan="4">{fac.theory.gradepoint}</td>  
                 <td rowspan="4">{fac.theory.CxG}</td>
                </tr>
                <tr>
                  <td>IA</td>
                  <td>{fac.theory.IA.maximummarks}</td>
                  <td>{fac.theory.IA.minimummarks}</td>
                  <td>{fac.theory.IA.marks}</td>

                   <td>{fac.theory.IA.grade}</td>
                </tr>
                <tr>
                  <td>MSE</td>
                  <td>{fac.theory.MSE.maximummarks}</td>
                  <td>{fac.theory.MSE.minimummarks}</td>
                  <td>{fac.theory.MSE.marks}</td>
                   <td>{fac.theory.MSE.grade}</td>
                </tr>
                 <tr>
                  <td>total</td>
                  <td>{fac.theory.total.maximummarks}</td>
                  <td></td>
                  <td>{fac.theory.total.marks}</td>
                   <td>{fac.theory.total.grade}</td>
                </tr>
                </React.Fragment>
               ))}
               
               {practical?.map((fac,idx)=>(
                 <React.Fragment>
                 <tr Key={idx} >
                 <td rowspan="3">{fac.subjectCode}</td>
                 <td rowspan="3">{fac.subjectname} Lab</td>
                 <td>TW</td>
                 <td>{fac.practical.termwork.maximummarks}</td>
                 <td>{fac.practical.termwork.minimummarks}</td>
                 <td>{fac.practical.termwork.marks}</td>
               <td rowspan="3">{fac.credits}</td>
                 <td>{fac.practical.termwork.grade}</td>
               <td rowspan="3">{fac.practical.gradepoint}</td>  
                <td rowspan="3">{fac.practical.CxG}</td>
               </tr>
               <tr>
                 <td>PR/OR</td>
                 <td>{fac.practical.orals.maximummarks}</td>
                 <td>{fac.practical.orals.minimummarks}</td>
                 <td>{fac.practical.orals.marks}</td>
                  <td>{fac.practical.orals.grade}</td>
               </tr>
                <tr>
                 <td>total</td>
                 <td>{fac.practical.total.maximummarks}</td>
                 <td></td>
                 <td>{fac.practical.total.marks}</td>
                  <td>{fac.practical.total.grade}</td>
               </tr>
               </React.Fragment>
               ))}
               <tr>
                <td colspan="2">Grand Total</td>
                <td colSpan={3}>{totalmark}</td>
                <td>{result.grandtotal}</td>
                <td>{result.totalcredits}</td>
                <td colSpan={3}>{result.totalCxG}</td>
               </tr>
               </tbody>
              </table>
              <h3>SGPI:{result.SGPI}</h3>
              <h3>Status:{status}</h3>
            </div>
          )}
        </div>
)
}
export default Body;
