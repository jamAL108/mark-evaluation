import React from 'react';
import {Link} from 'react-router-dom';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import GroupSharpIcon from '@mui/icons-material/GroupSharp';
import HomeIcon from "@mui/icons-material/Home";
import { NavLink, useNavigate } from "react-router-dom";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import EngineeringIcon from "@mui/icons-material/Engineering";
import AddIcon from "@mui/icons-material/Add";
import BoyIcon from "@mui/icons-material/Boy";
const isNotActiveStyle =
"flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
const isActiveStyle =
"flex items-center px-5 gap-3 text-blue-600 transition-all duration-200 ease-in-out capitalize hover:bg-gray-200 py-2 my-1";
function Sidebar(){
    return(
        <div className="sidebarr">
        <div className="side">
          <div className="a">
            <NavLink
              to="/admin/addnotice"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="a" />
              <h1 className="font-normal">Create Notice</h1>
            </NavLink>
          </div>
          <div className="a">
            <NavLink
              to="/admin/ourfaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <EngineeringIcon className="a" />
              <h1 className="font-normal">Our Faculty</h1>
            </NavLink>
  
            <NavLink
              to="/admin/addfaculty"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="a" />
              <h1 className="font-normal">Add Faculty</h1>
            </NavLink>
          </div>
          <div className="a">
            <NavLink
              to="/admin/ourstudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <BoyIcon className="a" />
              <h1 className="font-normal">Our Students</h1>
            </NavLink>
  
            <NavLink
              to="/admin/addstudent"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AddIcon className="a" />
              <h1 className="font-normal">Add Students</h1>
            </NavLink>
          </div>
          <div className="a">
            <NavLink
              to="/admin/result"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <HomeIcon className="a" />
              <h1 className="font-normal">RESULT GENERATE</h1>
            </NavLink>
            <NavLink
              to="/admin/initiateclass"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AssignmentIndIcon className="a" />
              <h1 className="font-normal">Initiate State</h1>
            </NavLink>
            <NavLink
              to="/admin/addsubject"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }>
              <AssignmentIndIcon className="a" />
              <h1 className="font-normal">Add subject</h1>
            </NavLink>
          </div>        
        </div>
      </div>
    );
}

export default Sidebar;