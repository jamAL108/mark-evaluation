import React ,{useState , useEffect} from 'react';
import Logo from '../../images/logobgremove.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector } from 'react-redux';
import Logout from '../../images/signout.png';
import './navbar.css';
function Header(){
    const navigate =  useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const [name , setname]= useState("");
    useEffect(()=>{
        setname(user.data.name.substring(0, user.data.name.indexOf(' ')));
    },[user])
    const logout=(e)=>{
        dispatch({type:"TEACHER_LOGOUT" });
        navigate('/');
    }
    return(
        <div className="header">
        <div className="logo">
            <img src={Logo} alt={"dylogo"} />
        </div>
        <div className="head">
            <p>Welcome , {name}</p>
        </div>
            <div className="logout">
            <p>sign out</p>
            <img src={Logout} alt="" onClick={logout} />
        </div>
        </div>
        );
}
export default Header;