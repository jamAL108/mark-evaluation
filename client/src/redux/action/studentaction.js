import { STUDENT_LOGIN, 
  STUDENT_LOGIN_ERROR,  
  STUD_UPDATE_PASSWORD , 
  STUD_UPDATE_PASSWORD_ERROR ,
   STUD_GET_NOTICE ,
   STUD_GET_NOTICE_ERROR , 
   VIEW_FACULTY , 
   VIEW_FACULTY_ERROR ,
   GET_MARKS ,
   OVERALL_ATTEND , 
   OVERALL_ATTEND_ERROR , 
   GET_MARKS_ERROR } from "../actiontype";

export const studentlogin =(formdata , navigate) => async (dispatch) =>{
    try{
        const res = await fetch("http://localhost:8000/stud/studlogn",{
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
        dispatch({type:STUDENT_LOGIN, payload:msg.response})
        dispatch({type:STUDENT_LOGIN_ERROR , payload:{}})      
        // dispatch({type:STUDENT_LOG , payload:true})
        if(ft===true){
          navigate("/student")
        }else{
          navigate("/studentpass")
        }
        }else if(res.status===404){
          console.log(msg.error);
          dispatch({type:STUDENT_LOGIN_ERROR , payload:msg.error})
        }
      }catch(error){
        console.log(error);
      }
};

export const passwordupd = (data,navigate)=>async(dispatch)=>{
  try{
    const resp = await fetch("http://localhost:8000/stud/studpass",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body: JSON.stringify(data)
    });
    const msg = await resp.json();
    if(resp.status===200){
      dispatch({type:STUD_UPDATE_PASSWORD , payload:true})
      dispatch({type:STUD_UPDATE_PASSWORD_ERROR , payload:{}})
      navigate("/student");

    }else if(resp.status===400 || resp.status===404){
      dispatch({type:STUD_UPDATE_PASSWORD_ERROR , payload:msg.error})
    }
  }catch(err){
     console.log(err);
  }
};

export const getnotice = ()=>async(dispatch)=>{
  try{
    const data = await fetch("http://localhost:8000/stud/getnoti", {
      method:"GET",
      headers:{
       "Content-Type":"application/json"
   }
    });
    const msg = await data.json();
    if(data.status===200){
     dispatch({type:STUD_GET_NOTICE , payload:msg.response})
    }else if(data.status===404){
     dispatch({type:STUD_GET_NOTICE_ERROR , payload:msg.error})
    }
   }catch(err){
     console.log(err);
   }
};


export const Viewfaculty = (formdata)=>async(dispatch)=>{
   try{
    const data = await fetch("http://localhost:8000/stud/viewfacult", {
      method:"POST",
      headers:{
       "Content-Type":"application/json"
   },
   body:JSON.stringify(formdata)
    });
    const msg = await data.json();
    if(data.status===200){
     dispatch({type:VIEW_FACULTY , payload:msg.response})
    }else if(data.status===404){
     dispatch({type:VIEW_FACULTY_ERROR , payload:msg.error})
    }
   }catch(err){
    console.log(err);
   }
};


export const getmarks =(formdata) =>async(dispatch)=>{
  try{
    const data = await fetch("http://localhost:8000/stud/getmarks", {
      method:"POST",
      headers:{
       "Content-Type":"application/json"
   },
   body:JSON.stringify(formdata)
    });
    const msg = await data.json();
    if(data.status===200){
     dispatch({type:GET_MARKS , payload:msg.response})
    }else if(data.status===404){
     dispatch({type:GET_MARKS_ERROR , payload:msg.error})
    }
  }catch(err){
    console.log(err);
  }
};

export const overallattendance = (formdata) => async(dispatch)=>{
  try{
    const data = await fetch("http://localhost:8000/stud/overallattend", {
      method:"POST",
      headers:{
       "Content-Type":"application/json"
   },
     body:JSON.stringify(formdata)
    });
    console.log(formdata);
    const msg = await data.json();
    console.log(msg);
    if(data.status===200){
     dispatch({type:OVERALL_ATTEND , payload:msg.response})
     console.log("heeeeeellllooooo")
    }else if(data.status===404){
     dispatch({type:OVERALL_ATTEND_ERROR , payload:msg.error})
    }
  }catch(err){
    console.log(err);
  }
}