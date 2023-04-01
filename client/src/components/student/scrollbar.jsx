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
      to="/student/profile"
      className={({ isActive }) =>
        isActive ? isActiveStyle : isNotActiveStyle
      }>
      <AccountBoxIcon className="" />
      <h1 className="font-normal">Profile</h1>
    </NavLink>

    <NavLink
      to="/student/faculties"
      className={({ isActive }) =>
        isActive ? isActiveStyle : isNotActiveStyle
      }>
      <ViewListIcon className="" />
      <h1 className="font-normal">My faculties</h1>
    </NavLink>
  </div>

  <div className="">  
      <NavLink
        to="/student/attendance"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }>
        <BorderColorIcon className="" />
        <h1 className="font-normal">Attendance</h1>
      </NavLink>
    </div>

      <div className="">
      <NavLink
        to="/student/viewmark"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }>
        <FileUploadIcon className="" />
        <h1 className="font-normal">view mark</h1>
      </NavLink>
  
      <NavLink
        to="/student/result"
        className={({ isActive }) =>
          isActive ? isActiveStyle : isNotActiveStyle
        }>
        <BorderColorIcon className="" />
        <h1 className="font-normal">result</h1>
      </NavLink>
    </div>

    <div className="">  
      <NavLink
        to="/student/faqs"
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