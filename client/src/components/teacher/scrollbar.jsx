import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
const isNotActiveStyle =
"flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
"flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
function scrollbar () {
  return (
    <div className="sidebar">
      
  <div className="">
    <NavLink
      to="/teacher/profile"
      className={({ isActive }) =>
        isActive ? isActiveStyle : isNotActiveStyle
      }>
      <AccountBoxIcon className="" />
      <h1 className="font-normal">Profile</h1>
    </NavLink>

    <NavLink
      to="/teacher/myclass"
      className={({ isActive }) =>
        isActive ? isActiveStyle : isNotActiveStyle
      }>
      <ViewListIcon className="" />
      <h1 className="font-normal">My class</h1>
    </NavLink>
  </div>

      <div className="">
      <NavLink
        to="/teacher/uploadmark"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }>
        <FileUploadIcon className="" />
        <h1 className="font-normal">Upload mark</h1>
      </NavLink>
  
      <NavLink
        to="/teacher/attendance"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }>
        <BorderColorIcon className="" />
        <h1 className="font-normal">Attendance</h1>
      </NavLink>

      <NavLink
        to="/teacher/defaulter"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }>
        <BorderColorIcon className="" />
        <h1 className="font-normal">Defaulter</h1>
      </NavLink>
    </div>

    <div className="">  
      <NavLink
        to="/teacher/faqs"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }>
        <QuestionAnswerIcon className="" />
        <h1 className="font-normal">FaQs</h1>
      </NavLink>
    </div>
    </div>
  );
}

export default scrollbar;