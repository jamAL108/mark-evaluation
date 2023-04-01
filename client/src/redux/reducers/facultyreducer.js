import {
    SET_ERRORS,
    FACULTY_LOGIN,
    FACULTY_LOGIN_ERROR,
    FACULTY_LOG,
    UPDATE_FACULTY,
    ADD_TEST,
    GET_TEST,
    GET_STUDENT,
    TEACH_GET_NOTICE, 
    TEACH_GET_NOTICE_ERROR,
    T_GET_ALL_STUDENT ,
    T_GET_ALL_STUDENT_ERROR,
    MARKS_UPLOADED,
    MARKS_UPLOAD_ERROR,
    ATTENDANCE_MARKED,
    ATTENDANCE_MARKED_ERROR , 
    TEACHER_LOGOUT,
    TEACH_UPDATE_PASSWORD,
    TEACH_UPDATE_PASSWORD_ERROR
  } from "../actiontype";

const initialstate={
    authordata:null,
    facultylogin:false,
    facultyloginerror:"",
    facultyupdated:false,
    markuploaded:false,
    marksuploaderror:"",
    attendancemarked:false,
    test:[],
    students:[],
    getstudenterror:"",
    addtest:false,
    techupdatepassword:false,
    techupdatepassworderror:"",
    notice:[],
    getnoticeerror:"",
    attendancedone:false,
    attendanceerror:""
}  
const faculty =(state=initialstate , action) =>{
    switch(action.type){
    case FACULTY_LOGIN:
        const data = action.payload;
        localStorage.setItem("user",JSON.stringify({data}));
        return { ...state, authordata: action.payload };
    case FACULTY_LOG:
        return {
            ...state , facultylogin:action.payload
        }
    case FACULTY_LOGIN_ERROR:
        return {
            ...state, facultyloginerror:action.payload
        }    
    case TEACHER_LOGOUT:
        localStorage.clear();
        return{
            authordata:null,
            facultylogin:false,
            facultyloginerror:"",
            facultyupdated:false,
            markuploaded:false,
            marksuploaderror:"",
            attendancemarked:false,
            test:[],
            students:[],
            getstudenterror:"",
            addtest:false,
            techupdatepassword:false,
            techupdatepassworderror:"",
            notice:[],
            getnoticeerror:""
        }
    case TEACH_UPDATE_PASSWORD: 
         return{
            ...state , techupdatepassword:true
         }  
    case TEACH_UPDATE_PASSWORD_ERROR:
        return{
            ...state , techupdatepassworderror:action.payload
        }
    case TEACH_GET_NOTICE:
        return{
            ...state , notice:action.payload
        }
    case TEACH_GET_NOTICE_ERROR:    
        return{
            ...state , getnoticeerror:action.payload
        }
    case T_GET_ALL_STUDENT:
            return{
            ...state ,students:action.payload
                }
    case T_GET_ALL_STUDENT_ERROR:
            return{
                    ...state , getstudenterror:action.payload
                }  
    case MARKS_UPLOADED:
        return{
            ...state ,  markuploaded:action.payload
        }
    case MARKS_UPLOAD_ERROR:
        return{
            ...state , marksuploaderror:action.payload
        }
    case ATTENDANCE_MARKED:
        return{
            ...state , attendancedone:action.payload
        }
    case ATTENDANCE_MARKED_ERROR:
        return{
            ...state , attendanceerror:action.payload
        }                           
    default:
        return state;
}
};
export default faculty;