import React from 'react';
import Logo from '../../images/logo.png';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';

function Navbar(){
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const logout=(e)=>{
        dispatch({type:"STUDENT_LOGOUT" });
        navigate('/');
    }
    return(
        <div className="header">
        <div className="logo">
            <img src={Logo} alt="" />
        </div>
        <div className="head">Welcome</div>
        <div className="logout">
            <p>admin</p>
            <button onClick={logout}><LogoutSharpIcon /></button>
        </div>
        </div>
        );
}

export default Navbar;