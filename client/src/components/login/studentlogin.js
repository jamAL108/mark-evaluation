import React, { useEffect, useState } from "react";
import './teacherlogin.css';
import logo from "../../images/logo.png";
import {useDispatch , useSelector} from 'react-redux';
import { useNavigate} from 'react-router-dom';
import { studentlogin } from "../../redux/action/studentaction";
const TeacherLogin = () => {
    const [Rollno, setRollno] = useState("");
    const [password , setpassword] = useState("");
    const [error , seterror]= useState({});
    const dispatch = useDispatch();
    const store = useSelector((state)=> state);
   const navigate = useNavigate();

   useEffect(()=>{
       seterror(store.student.studentloginerror);
       console.log(store.student.studentloginerror)
       setRollno("");
       setpassword("");
   },[store.student.studentloginerror])
   
   

   const check = async (e)=>{
    e.preventDefault();
        dispatch(studentlogin({Rollno,password},navigate));
   }
    return (
        <>
            <div className="containerlogin ">
                <div className="login-box">
                    <div className="user-icon">
                        <img src={logo} alt="" />
                    </div>
                    <div className="login" id="form">
                        <div className="form-group">
                            <input type="text" name="email" placeholder="Roll number" id="username" className="form-control" value={Rollno} onChange={(e)=>{setRollno(e.target.value)
                               seterror({}) }} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="Password" id="pass" className="form-control" value={password} onChange={(e)=>{setpassword(e.target.value)
                             seterror({})
                            }} />
                        </div>
                        <span>{error.emailError || error.passwordError || error.backenderror}</span>
                        <div className="form-group">
                            <button type="submit" onClick={check}>Login</button>
                        </div>
                    </div>
                </div>

                <footer>
                    ♾️ Designed and developed by Jamal.
                </footer>
            </div>

        </>
    )
}

export default TeacherLogin;