
// export default App;
import React from 'react';
import { Routes , Route } from 'react-router-dom';
import Login from './components/login/login';
import './App.css';
// admin
import AdminLogin from './components/login/adminlogin';
import AdminHome from './components/admin/adminhome';
import Addstudent  from './components/admin/addstudent/addstudent';
import Addfaculty from './components/admin/addfaculty/addfaculty';
import Ourfaculty from './components/admin/ourfaculty/ourfaculty';
import Ourstudent from './components/admin/ourstudent/ourstudent';
import Addnotice from './components/admin/addnotice/addnotice';
import InitialState from './components/admin/initiateclassroom/initiateclass';
import Addsubject from './components/admin/addsubject/addsubject';





//techer
import TeacherLogin from './components/login/teacherlogin';
import Teacherhome from './components/teacher/teacherhome';
import TNotice from './components/teacher/notice';
import Updatepass from './components/teacher/updatepass';
import TProfile from './components/teacher/profile/profile';
import Myclass from './components/teacher/myclass/myclass';
import Uploadmark from './components/teacher/uploadmarks/marks';
import TAttendance from './components/teacher/attendance/attendance';
import TFaqs from './components/teacher/faqs/faqs';
import Defaulter from './components/teacher/defaulter/defaulter';



// student
import StudentLogin from './components/login/studentlogin';
import Studenthome from './components/student/studenthome';
import SNotice from './components/student/notice';
import Updatepas from './components/student/updatepass';
import SAttendance from './components/student/attendance/attendance';
import Viewfaculty from './components/student/viewfaculty/viewfaculty';
import Sprofile from './components/student/profile/profile';
import SFaqs from './components/student/faqs/faqs';
import Viewmark from './components/student/viewmarks/viewmark';
import Result from './components/student/result/result';

function App() {
  return (
       <Routes>
         <Route path='/' element={<Login/>}/>

          {/* // admin  */}
         <Route path='/adminlogin' element={<AdminLogin/>}/>
         <Route path="/admin" element={<AdminHome/>}/>
         <Route path='/admin/addstudent' element={<Addstudent/>}/>
         <Route path='/admin/addfaculty' element={<Addfaculty/>}/>
         <Route path='/admin/ourstudent' element={<Ourstudent/>}/>
         <Route path='/admin/ourfaculty' element={<Ourfaculty/>}/>
         <Route path='/admin/ourfaculty' element={<Ourfaculty/>}/>
         <Route path='/admin/Addnotice' element={<Addnotice/>}/>
         <Route path='/admin/initiateclass' element={<InitialState/>}/>
         <Route path='/admin/addsubject' element={<Addsubject/>}/>





        {/* //teacher */}
        <Route path='/login/facultylogin' element={<TeacherLogin/>}/>
        <Route path='/teacher' element={<Teacherhome/>}/>
        <Route path='/teacher/notice' element={<TNotice/>}/>
        <Route path='/teacherpass' element={<Updatepass/>}/>
        <Route path='/teacher/profile' element={<TProfile/>}/>
        <Route path='/teacher/myclass' element={<Myclass/>}/>
        <Route path='/teacher/uploadmark' element={<Uploadmark/>}/>
        <Route path='/teacher/attendance' element={<TAttendance/>}/>
        <Route path='/teacher/faqs' element={<TFaqs/>}/>
        <Route path='/teacher/defaulter' element={<Defaulter/>}/>




        {/* // student */}
        <Route path='/login/studentlogin' element={<StudentLogin/>}/>
        <Route path='/student' element={<Studenthome/>}/>
        <Route path='/student/notice' element={<SNotice/>}/>
        <Route path='/studentpass' element={<Updatepas/>}/>
        <Route path='/student/attendance' element={<SAttendance/>}/>
        <Route path='/student/faculties' element={<Viewfaculty/>}/>
        <Route path='/student/profile' element={<Sprofile/>}/>
        <Route path='/student/viewmark' element={<Viewmark/>} />
        <Route path='/student/result' element={<Result/>}/>
        <Route path='/student/faqs' element={<SFaqs/>}/>

        
       </Routes>

       
  );
}

export default App;