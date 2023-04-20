import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import './sidebar.css';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
function scrollbar () {
  return (
    <div className="sidebar">
    <NavLink
      to="/student/profile"
      className="a">
      <AccountBoxIcon className="" />
      <h1 className="font-normal">Profile</h1>
    </NavLink>
    <NavLink
      to="/student/faculties"
      className="a">
      <ViewListIcon className="" />
      <h1 className="font-normal">My faculties</h1>
    </NavLink>
     <NavLink
        to="/student/attendance"
        className="a">
        <BorderColorIcon className="" />
        <h1 className="font-normal">Attendance</h1>
      </NavLink>
      <NavLink
        to="/student/viewmark"
        className="a">
        <FileUploadIcon className="" />
        <h1 className="font-normal">view mark</h1>
      </NavLink>
      <NavLink
        to="/student/result"
        className="a">
        <BorderColorIcon className="" />
        <h1 className="font-normal">result</h1>
      </NavLink>
      <NavLink
        to="/student/faqs"
        className="a">
        <QuestionAnswerIcon className="" />
        <h1 className="font-normal">FaQs</h1>
      </NavLink>
    </div>
  );
}

export default scrollbar;