import { formControlLabelClasses } from "@mui/material";
import { FACULTY_LOGIN, FACULTY_LOGIN_ERROR, TEACH_UPDATE_PASSWORD , TEACH_UPDATE_PASSWORD_ERROR , FACULTY_LOG , TEACH_GET_NOTICE , TEACH_GET_NOTICE_ERROR , T_GET_ALL_STUDENT_ERROR , T_GET_ALL_STUDENT ,MARKS_UPLOADED , MARKS_UPLOAD_ERROR, ATTENDANCE_MARKED , ATTENDANCE_MARKED_ERROR , CC_DEFAULTER , GET_DEFAULTER , GET_DEFAULTER_ERROR , T_SUBJECT} from "../actiontype";
import {BASE_URL} from '../helper.js';
const URL= BASE_URL;

export const facultylogin =(formdata , navigate) => async (dispatch) =>{
    try{
        const api = `${URL}/facult/facullogn`;
        const res = await fetch(api,{
          method:"POST",
          headers:{
              "Content-Type":"application/json"
          },
          body: JSON.stringify(formdata)
        });
        const msg = await res.json();
        if(res.status===200){
          const ft = msg.response.passwordupdated;
          console.log(ft);
        dispatch({type:FACULTY_LOGIN, payload:msg.response})
        dispatch({type:FACULTY_LOG , payload:true})
        if(ft===true){
          navigate("/teacher")
        }else{
          navigate("/teacherpass")
        }
        }else if(res.status===404){
          console.log(msg.error);
          dispatch({type:FACULTY_LOGIN_ERROR , payload:msg.error})
        }
      }catch(error){
        console.log(error);
      }
}

export const passwordupd = (data,navigate)=>async(dispatch)=>{
  try{
    const api = `${URL}/facult/faculpass`
    const resp = await fetch(api,{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    });
    const msg = await resp.json();
    if(resp.status===200){
      dispatch({type:TEACH_UPDATE_PASSWORD , payload:true})
      navigate("/teacher");
    }else if(resp.status===400 || resp.status===404){
      dispatch({type:TEACH_UPDATE_PASSWORD_ERROR , payload:msg.error})
    }
  }catch(err){
    console.log("hi");
     console.log(err);
  }
};

export const getnotice = ()=>async(dispatch)=>{
   try{
     const data = await fetch(`${URL}/facult/getnoti`, {
       method:"GET",
       headers:{
        "Content-Type":"application/json"
    }
     });

     const msg = await data.json();
     console.log(msg);
     console.log(msg.response);
     if(data.status===200){
      dispatch({type:TEACH_GET_NOTICE , payload:msg.response})
     }else if(data.status===404){
      dispatch({type:TEACH_GET_NOTICE_ERROR , payload:msg.error})
     }
    }catch(err){
      console.log(err);
    }
};

export const getstudent = (data) => async(dispatch)=>{
  try{
      const respon = await fetch(`${URL}/facult/getstud`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(data)
        });
       const msg = await respon.json();
       if(respon.status === 200 ){
        console.log(msg.response);
            dispatch({type: T_GET_ALL_STUDENT ,payload:msg.response})
    }else if(respon.status === 404){
      dispatch({type: T_GET_ALL_STUDENT_ERROR  ,payload:msg.error})
    }
    }
  catch(err){
    console.log(err);
  }
}

export const uploadmark = (formdata) => async(dispatch)=>{
   try{
    const res = await fetch(`${URL}/facult/uploadmark`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
       },
      body: JSON.stringify(formdata)
      });
      const msg = await res.json();
      console.log(msg.response);
      if(res.status===200){
        dispatch({type:MARKS_UPLOADED , payload:true})
      }else if(res.status===404){
       dispatch({type:MARKS_UPLOAD_ERROR , payload:msg.error})
      }
   }catch(err){
    console.log(err);
   }
};

export const attendancestudentfetch =(formdata) =>async(dispatch)=>{
    try{
      const res = await fetch(`${URL}/facult/studfetch`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(formdata)
        });
        const msg = await res.json();
        console.log(msg.response);
        if(res.status===200){
          dispatch({type: T_GET_ALL_STUDENT ,payload:msg.response})
        }else if(res.status===404){
         dispatch({type:T_GET_ALL_STUDENT_ERROR , payload:msg.error})
        }
    }catch(err){
      console.log(err);
    }
};

export const MarkAttendance = (formdata) => async (dispatch)=>{
    try{
      const res = await fetch(`${URL}/facult/markattendance`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(formdata)
        });
        const msg = await res.json();
        console.log(msg.response);
        if(res.status===200){
          dispatch({type:ATTENDANCE_MARKED , payload:true})
        }else if(res.status===404){
         dispatch({type:ATTENDANCE_MARKED_ERROR , payload:msg.error})
        }
    }catch(err){
      console.log(err);
    }
};

export const getdefaulter = (formdata)=>async(dispatch)=>{
    try{
        const res = await fetch(`${URL}/facult/getdef`,{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(formdata)
        });
        const msg = await res.json();
        if(res.status===200){
         dispatch({type:GET_DEFAULTER , payload:msg.other})
         dispatch({type:CC_DEFAULTER , payload:msg.cc})
        }else if(res.status===404){
         dispatch({type:GET_DEFAULTER_ERROR , payload:msg.error})
        }
    }catch(err){
      console.log(err);
    }
};

export const getsubjects = (formdata) =>async(dispatch)=>{
   try{
    const res = await fetch(`${URL}/facult/getsubject`,{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
       },
      body: JSON.stringify(formdata)
      });
      const msg = await res.json();
        console.log(msg.response);
        if(res.status===200){
           dispatch({type:T_SUBJECT , payload:msg.response})
        }else if(res.status===404){
         console.log(msg.error);
      }
   }catch(err){
    console.log(err);
   }
};

