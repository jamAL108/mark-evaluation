import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import { passwordupd } from '../../redux/action/studentaction';
import Logo from "../../images/logo.png"
import '../login/teacherlogin.css';

const Updatepass = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const [error , seterror]= useState({});
    const dispatch = useDispatch();
    const store = useSelector((state)=> state);
   const navigate = useNavigate();
   const[value , setValue]=useState({
    Rollno:user.data.Rollno,
    newpassword:"",
    confirmpassword:""
   })

   useEffect(()=>{
     seterror(store.student.studupdatepassworderror)
   },[store.student.studupdatepassworderror])

   const submi = async (e)=>{
    e.preventDefault();
        dispatch(passwordupd(value,navigate));
   }
    return (
        <>
            <div className="containerlogin ">
                <div className="login-box">
                    <div className="user-icon">
                        <img src={Logo} alt="" />
                    </div>
                    <div className="login" id="form">
                        <div className="form-group">
                            <input type="password" name="email" placeholder="newpassword" id="username" className="form-control" value={value.newpassword} onChange={(e)=>{
                                setValue({...value , newpassword:e.target.value}) 
                                seterror({})
                               }} />
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" placeholder="confirm password" id="pass" className="form-control" value={value.confirmpassword} onChange={(e)=>{
                               setValue({...value , confirmpassword:e.target.value})
                               seterror({})
                            }} />
                        </div>
                        <span>{ error.passworderror || error.backenderror }</span>
                        <div className="form-group">
                            <button type="submit" onClick={submi}>change password</button>
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
export default Updatepass;