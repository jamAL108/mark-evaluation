import {
     ADD_DEPARTMENT,
     LOGOUT
    , ADD_FACULTY
    ,ADD_FACULTY_ERROR
    , GET_ALL_FACULTY ,
    GET_ALL_FACULTY_ERROR 
    , ADD_SUBJECT ,
    ADD_SUBJECT_ERROR
    , GET_ALL_SUBJECT
    , ADD_STUDENT
    , ADD_STUDENT_ERROR
    , GET_ALL_STUDENT ,
    GET_ALL_STUDENT_ERROR
    , GET_SUBJECT ,
    GET_SUBJECT_ERROR,
    GENERATE_DEFUALTER,
    GENERATE_DEFUALTER_ERROR,
    UPGRADE_YEAR,
    UPGRADE_YEAR_ERROR,
    CREATE_NOTICE,
    CREATE_NOTICE_ERROR ,
    INITIATE_CLASS ,
    INITIATE_CLASS_ERROR , 
    YEAR_UPDATE ,  
    ODD_SEM_UPDATE , ODD_SEM_UPDATE_ERROR,
    EVEN_SEM_UPDATE ,  EVEN_SEM_UPDATE_ERROR

} from '../actiontype';
import Swal from "sweetalert2";



export const addfaculty = (formdata , navigate) => async (dispatch) =>{
    try{
        const res = await fetch("http://localhost:8000/adminn/adfacul",{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
           },
          body: JSON.stringify(formdata)
          });
         const msg = await res.json();
         console.log(msg);
         if(res.status === 200 ){
              dispatch({type:ADD_FACULTY ,payload:true })
              console.log("hello")
      }else if(res.status === 300 || res.status===400){
        dispatch({type:ADD_FACULTY_ERROR ,payload:msg.error })
             console.log("bye");
      }
      }
    catch(err){
      console.log(err);
    }
}
export const addstudent = (fordata , navigate) => async (dispatch) =>{
  try{
      const re = await fetch("http://localhost:8000/adminn/adstud",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(fordata)
        });
       const ms = await re.json();
       console.log(ms.message);
       if(re.status === 200 ){
            dispatch({type:ADD_STUDENT ,payload:true })
    }else if(re.status===300){
      dispatch({type:ADD_STUDENT_ERROR ,payload:ms.error })
    }
    }
  catch(err){
    console.log(err);
  }
}
export const addnotice = (formdta,navigate) => async (dispatch) =>{
  try{
    console.log("heo");
      const resp = await fetch("http://localhost:8000/adminn/adnotic",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(formdta)
        });
       const mssg = await resp.json();
       const message = mssg.message;
       if(resp.status === 200 ){
            dispatch({type:CREATE_NOTICE ,payload:true })
            Swal.fire(
              'Success',
              message,
              'success'
            )
    }else if(resp.status===404){
      dispatch({type:CREATE_NOTICE_ERROR ,payload:mssg.error })
    }
    }
  catch(err){
    console.log(err);
  }
};




export const addsubject = (formdata , navigate) => async (dispatch) =>{
  try{
      const res = await fetch("http://localhost:8000/adminn/adsubj",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(formdata)
        });
       const msg = await res.json();
       console.log(msg.message);
       if(res.status === 200 ){
            dispatch({type:ADD_SUBJECT ,payload:true })
    }else if(res.status===404){
      dispatch({type:ADD_SUBJECT_ERROR ,payload:msg.error })
    }
    }
  catch(err){
    console.log(err);
  }
}

export const getsubject = (formdata) => async (dispatch) =>{
  try{
      const res = await fetch("http://localhost:8000/adminn/getsubj",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(formdata)
        });
       const msg = await res.json();
       console.log(msg.message);
       console.log(msg.error);
       if(res.status === 200 ){
            dispatch({type:GET_SUBJECT ,payload:msg.response })
            console.log("dispatch done");
    }else if(res.status===404){
      dispatch({type:GET_SUBJECT_ERROR ,payload:msg.error })
    }
    }
  catch(err){
    console.log(err);
  }
}





export const initiateclass = (data) => async(dispatch)=>{
     try{
      const res = await fetch("http://localhost:8000/adminn/initiate",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(data)
        });
        const msg = await res.json();
        console.log(msg);
        console.log(msg.response);
        console.log(msg.message);
        if(res.status === 200 ){
             dispatch({type: INITIATE_CLASS ,payload:true})
     }else if(res.status===404){
       dispatch({type: INITIATE_CLASS_ERROR ,payload:msg.error })
     }
     }
   catch(err){
     console.log(err);
   }
}




export const ourfaculty = (data,navigate) => async(dispatch)=>{
  try{
    console.log(data);
      const respon = await fetch("http://localhost:8000/adminn/ourfacul",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(data)
        });
       const msg = await respon.json();
       console.log(msg);
       console.log(msg.response);
       if(respon.status === 200 ){
            dispatch({type: GET_ALL_FACULTY ,payload:msg.response})
    }else if(respon.status===404 || respon.status===400){
      dispatch({type: GET_ALL_FACULTY_ERROR  ,payload:msg.error })
    }
    }
  catch(err){
    console.log(err);
  }
}

export const ourstudent = (data,navigate) => async(dispatch)=>{
  try{
    console.log(data);
      const respon = await fetch("http://localhost:8000/adminn/ourstud",{
        method: "POST",
        headers: {
          "Content-Type":"application/json"
         },
        body: JSON.stringify(data)
        });
       const msg = await respon.json();
       console.log(msg);
       console.log(msg.response);
       if(respon.status === 200 ){
            dispatch({type: GET_ALL_STUDENT ,payload:msg.response})
    }else if(respon.status===404 || respon.status===400){
      dispatch({type: GET_ALL_STUDENT_ERROR  ,payload:msg.error })
    }
    }
  catch(err){
    console.log(err);
  }
}

export const monthlydefaulter = (formdata) =>async(dispatch)=>{
   try{
    const respon = await fetch("http://localhost:8000/adminn/generatedef",{
      method: "POST",
      headers: {
        "Content-Type":"application/json"
       },
       body: JSON.stringify(formdata)
      });
      const msg = await respon.json();
      console.log(msg);
      console.log(msg.response);
      if(respon.status === 200 ){
           dispatch({type:GENERATE_DEFUALTER  ,payload:msg.response})
   }else if(respon.status===404 || respon.status===400){
     dispatch({type: GENERATE_DEFUALTER_ERROR  ,payload:msg.error })
   }
   }catch(err){
    console.log(err);
   }
};

export const upgradeyear = () =>async(dispatch)=>{
  try{
    const respon = await fetch("http://localhost:8000/adminn/upgradeyr",{
      method: "GET",
      headers: {
        "Content-Type":"application/json"
       },
      });
      const msg = await respon.json();
      console.log(msg);
      console.log(msg.response);
      if(respon.status === 200 ){
           dispatch({type:UPGRADE_YEAR  ,payload:msg.response})
           dispatch({type:YEAR_UPDATE , payload:true});
   }else if(respon.status===404){
     dispatch({type: UPGRADE_YEAR_ERROR  ,payload:msg.error })
   }
    }catch(err){
    console.log(err);
   }
};


export const changetoodd = () =>async(dispatch)=>{
  try{
    const respon = await fetch("http://localhost:8000/adminn/changetoodd",{
      method: "GET",
      headers: {
        "Content-Type":"application/json"
       },
      });
      const msg = await respon.json();
      console.log(msg);
      console.log(msg.response);
      if(respon.status === 200 ){
           dispatch({type:ODD_SEM_UPDATE  ,payload:msg.response})
   }else if(respon.status===404){
    console.log(msg.error);
   }
    }catch(err){
    console.log(err);
   }
};

export const changetoeven = () =>async(dispatch)=>{
  try{
    const respon = await fetch("http://localhost:8000/adminn/changetoeven",{
      method: "GET",
      headers: {
        "Content-Type":"application/json"
       },
      });
      const msg = await respon.json();
      console.log(msg);
      console.log(msg.response);
      if(respon.status === 200 ){
           dispatch({type:EVEN_SEM_UPDATE  ,payload:msg.response})
   }else if(respon.status===404){
      console.log(msg.error);
   }
    }catch(err){
    console.log(err);
   }
};