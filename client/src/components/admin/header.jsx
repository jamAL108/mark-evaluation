import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../images/logo.png';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
function Header(){
    const dispatch = useDispatch();
    const navigate =  useNavigate();
    const logout=()=>{
        dispatch({type:"TEACHER_LOGOUT" });
        navigate('/');
    }
    return(
        <div className="header">
            <img src={Logo} alt="" />
        <h3 className="head">Welcome</h3>
        <div className="logout">
            <p className='font-bold text-blue-600 text-sm'>admin</p>
            <button onClick={logout}><LogoutSharpIcon /></button>
        </div>
        </div>
        );
}
export default Header;