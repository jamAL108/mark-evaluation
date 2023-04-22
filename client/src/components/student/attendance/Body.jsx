import React , {useEffect , useState} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useSelector , useDispatch} from "react-redux"
import { ATTENDANCE, ATTENDANCE_DATES, ATTENDANCE_ERROR } from '../../../redux/actiontype';
import './body.css';
import { viewattendance ,getdates } from '../../../redux/action/studentaction';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Body() {
  const store = useSelector((state) => state);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const dispatch = useDispatch();
  const [arrow, setarrow] = useState(false);
  const [data, setdata] = useState([]);
  const [namemonth , setnamemonth]=useState("");
  const [main, setmain] = useState([]);
  const [subj , setsubj]= useState("");
  const [curdates, setcurdates] = useState([]);
  const [prevdates,setprevdates]=useState([]);
  const [dates , setdates]=useState([]);
  const [display, setdisplay] = useState(false);
  const [month, setmonth] = useState("");
  const [make, setmake] = useState(false);
  const array = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const array2 = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const [value, setvalue] = useState({
    _id: user.data._id,
    depart: user.data.depart,
    year: user.data.year,
    division: user.data.division
  });

  console.log(value);
  useEffect(() => {
    console.log("hello");
  },[]);

  useEffect(() => {
    dispatch(viewattendance(value));
    dispatch(getdates(value));
  }, [dispatch]);

  useEffect(() => {
    setdisplay(false);
    if (store.student.overallattendance && store.student.monthattendance) {
      console.log("inside month change effect");
      console.log(store.student.overallattendance);
      console.log(store.student.monthattendance);
      if (month === "Overall") {
        setdata(store.student.overallattendance);
      } else {
        console.log("wanakam");
        setdata(store.student.monthattendance);
      }
      setmake(true);
    }
  }, [month]);

  useEffect(() => {
    if (data.length !== 0 && make === true) {
      console.log("data milgaya");
      console.log(array);
      if (month !== "Overall") {
        for (var i = 0; i < array.length; i++) {
          if (array[i] === month) {
            setnamemonth(array2[i]);
            setmain(data[i]);
            console.log(data[i]);
          }
        }
      } else {
        console.log("namaste");
        setmain(data);
      }
      setmake(false);
    }
  }, [make, data]);

  useEffect(() => {
    if (main.length !== 0) {
      setdisplay(true);
    } else {
      console.log("nkdsvjbs");
    }
  }, [main]);



  useEffect(() => {
    if (store.student.curmonth) {
      setcurdates(store.student.curmonth);
      console.log(store.student.curmonth);
    }
  }, [store.student.curmonth]);

  useEffect(() => {
    if (store.student.prevmonth) {
      setprevdates(store.student.prevmonth);
      console.log(store.student.prevmonth);
    }
  }, [store.student.curmonth]);


  useEffect(() => {
    if (dates.length !== 0) {
      setarrow(true);
    }
  }, [dates]);


  const getattendancedate = async (subject) => {
    console.log("heelo");
    const date = new Date();
    const curmonth = date.getMonth();
    console.log(curmonth);
    let previous=0;
    if (month !== "Overall") {
      for (var i = 0; i < array.length; i++) {
        if (array[i] === month) {
          console.log(i);
            if(i===0){
              previous=11;
            }else{
              previous=curmonth-1;
              console.log(previous);
            }
            if(i===curmonth){
               for(var k=0;k<curdates.length;k++){
                if(curdates[k].subjectcode===subject.subjectCode){
                  console.log(curdates[k]);
                  console.log("bkudbkwue");
                  setsubj(subject);
                   setdates(curdates[k].dates);
                }
               }
            }else if(i===previous){
              for(var k=0;k<prevdates.length;k++){
               if(prevdates[k].subjectCode===subject.subjectCode){
                  setdates(curdates[k].dates);
                  setsubj(subject);
               }
              }
           }
            break;
        }
      }
    } else {
      console.log("namaste");
    }
  };

  useEffect(()=>{
     console.log(subj);
  },[subj])

    return (
      <div className="attce" >
        {arrow===false && (
          <div className="frontage">
            <div className="formgroup">
              <h1 className="secton">Month :</h1>
              <Select
                required
                displayEmpty
                sx={{ height: 36 }}
                defaultValue="" 
                className='select'
                inputProps={{ "aria-label": "Without label" }}
                value={month}
                onChange={(e) => {
                  setmonth(e.target.value);
                  console.log(e.target.value);
                  setnamemonth("");
                } }>
                <MenuItem value="">None</MenuItem>
                <MenuItem value="Overall">Overall</MenuItem>
                <MenuItem value="jan">jan</MenuItem>
                <MenuItem value="feb">feb</MenuItem>
                <MenuItem value="mar">mar</MenuItem>
                <MenuItem value="apr">apr</MenuItem>
                <MenuItem value="may">may</MenuItem>
                <MenuItem value="jun">jun</MenuItem>
                <MenuItem value="jul">jul</MenuItem>
                <MenuItem value="aug">aug</MenuItem>
                <MenuItem value="sep">sep</MenuItem>
                <MenuItem value="oct">oct</MenuItem>
                <MenuItem value="nov">nov</MenuItem>
                <MenuItem value="dec">dec</MenuItem>
              </Select>
            </div>
            {display === true && main.length !== 0 && (
              <div className="tablee">
              <table className='style-table'>
              <tr id='headering'>
                    <th className="heading">
                      Sr no.
                    </th>
                    <th className="heading">
                      subject
                    </th>
                    <th className="heading">
                      subject code
                    </th>
                    <th className="heading">
                      lectures attended
                    </th>
                    <th className="heading">
                      percentage
                    </th>
                  </tr>
                  {main?.map((attend, idx) => (
                    <tr
                      key={idx}
                      className="cont" onClick={(e) => {
                        console.log("heelo");
                        getattendancedate(attend);
                      }} >
                      <td
                        className="contiii">
                        {idx + 1}
                      </td>
                      <td
                        className="cont">
                        {attend.subject}
                      </td>
                      <td
                        className="cont">
                        {attend.subjectCode}
                      </td>
                      <td
                        className="cont">
                        {attend.attended} / {attend.totallec}
                      </td>
                      <td
                        className="cont">
                        {attend.percentage || 0}
                      </td>
                    </tr>
                  ))}
              </table>
              </div>
            )}
          </div>
        )}




        {arrow === true && dates.length !== 0 && (
          <div className="secondpage">
            <ArrowBackIcon className='icon' onClick={(e) => {
              setarrow(false);
              setdates([]);
              setsubj({});
            } } />
               <div className="textarea">
                <h1>{namemonth} : {subj.subject}</h1>
               </div>
               <div className="tableee">
            <table>
            <tr id='headering' >
                  <th className="heading">
                    Sr no.
                  </th>
                  <th className="heading">
                    Date
                  </th>
                  <th className="heading">
                    Lecture
                  </th>
                  <th className="heading">
                    Attendance
                  </th>
                </tr>
                { dates.map((date, idx) => (
                  <tr
                    key={idx}
                    className="cont">
                    <td
                      className="contiii">
                      {idx + 1}
                    </td>
                    <td
                      className="cont">
                      {date.date}
                    </td>
                    <td
                      className="cont">
                      {date.time}
                    </td>
                    <td
                      className="cont">
                      {date.status}
                    </td>
                  </tr>
                ))}
            </table>
            </div>
          </div>
        )}


      </div>
    );
  }

export default Body;