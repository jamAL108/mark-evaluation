import React , {useEffect}from "react";
import { Link } from "react-router-dom";
import './abc.css';
import Logo from '../../images/logo.png';
import { CHANGE_TIMER  } from '../../redux/actiontype';
import { monthlydefaulter } from '../../redux/action/adminaction';
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const store = useSelector((state)=>state);

  return (
    <div className="logn">

      <div className="logincontainer">
        <img src={Logo} alt="" />
        <h1 className="select">
          choose anyone to proceed
        </h1>
        <div className="box">
          <div className="field">
            <Link
              to="/login/facultylogin">
                <button>Faculty</button>
            </Link>
          </div>
          <div className="field">
            <Link
              to="/login/studentlogin"
              ><button className="student">Student</button>
            </Link>
          </div>
        </div>
      </div>
      <footer>
          ♾️ Designed and developed by Jamal.
      </footer>
      </div>
  );
};

export default Login;