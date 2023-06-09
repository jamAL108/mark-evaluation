import {
    STUDENT_LOGIN,
    STUDENT_LOGIN_ERROR,
    STUD_UPDATE_PASSWORD,
    STUD_UPDATE_PASSWORD_ERROR,
    STUDENT_LOGOUT,
    UPDATE_STUDENT ,
    UPDATE_STUDENT_ERROR,
    STUD_GET_NOTICE, 
    OVERALL_ATTEND_ERROR,
    STUD_GET_NOTICE_ERROR,
    VIEW_FACULTY,
    VIEW_FACULTY_ERROR,
    GET_MARKS , 
    GET_MARKS_ERROR ,
    OVERALL_ATTEND,
    TEST_RESULT ,
     TEST_RESULT_ERROR 
     , MONTH_ATTENDANCE
     , OVERALL_ATTENDANCE
     , ATTENDANCE_ERROR
     , ATTENDANCE_DATES,
PREVIOUS_DATES
 , 
     CURRENT_DATES,
     RESULT ,
     RESULT_ERROR
} from '../actiontype.js';

const initialstate={
    authordata:null,
    studentlogin:false,
    overallattend:"",
    studentloginerror:"",
    studentupdated:false,
    testresult:[],
    attendance:[],
    attendanceerror:"",
    dates:[],
    notice:[],
    faculties:[],
    viewfacultyerror:"",
    getnoticeerror:"",
    studupdatepassword:false,
    studupdatepassworderror:"",
    marks:[],
    getmarkerror:"", 
    overralatterror:"",
    monthattendance:[],
    overallattendance:[],
    result:{},
    resulterror:"",
    curmonth:[],
    prevmonth:[]
}

const student =(state=initialstate , action) =>{
    switch(action.type){
    case STUDENT_LOGIN:
        const data = action.payload;
        localStorage.setItem("user",JSON.stringify({data}));
        return { ...state, authordata: action.payload };
    case STUDENT_LOGIN_ERROR:
        return {
            ...state, studentloginerror:action.payload
        }    
    case STUDENT_LOGOUT:
        localStorage.clear();
        return{
            authordata:null,
            studentlogin:false,
            overallattend:"",
            studentloginerror:"",
            studentupdated:false,
            testresult:[],
            monthattendance:[],
            overallattendance:[],
            attendanceerror:"",
            dates:[],
            notice:[],
            faculties:[],
            viewfacultyerror:"",
            getnoticeerror:"",
            studupdatepassword:false,
            studupdatepassworderror:"",
            marks:[],
            getmarkerror:"", 
            overralatterror:"",
            monthattendance:[],
            overallattendance:[],
            result:{},
            resulterror:"",
    curmonth:[],
    prevmonth:[]

        }
    case STUD_UPDATE_PASSWORD: 
         return{
            ...state , studupdatepassword:true
         }  
    case STUD_UPDATE_PASSWORD_ERROR:
        return{
            ...state , studupdatepassworderror:action.payload
        }
    case  STUD_GET_NOTICE:
        return{
            ...state , notice:action.payload
        }        
    case  STUD_GET_NOTICE_ERROR:
        return{
          ...state , getnoticeerror:action.payload
        }
    case VIEW_FACULTY:
            return{
                ...state , faculties:action.payload
            } 
    case VIEW_FACULTY_ERROR:
            return{
                ...state , viewfacultyerror:action.payload
            }
    case GET_MARKS:
        return{
            ...state , marks:action.payload
        }
    case GET_MARKS_ERROR:
        return{
            ...state , getmarkerror:action.payload
        }
    case OVERALL_ATTEND:
         return{
        ...state , overallattend:action.payload
       }
    case  OVERALL_ATTENDANCE:
        return{
            ...state , overallattendance:action.payload
        }
    case MONTH_ATTENDANCE:
        return{
            ...state , monthattendance:action.payload
        }        
    case ATTENDANCE_ERROR:
        return{
            ...state , attendanceerror:action.payload
        }
    case CURRENT_DATES:
        return{
            ...state , curmonth:action.payload
        }
    case PREVIOUS_DATES:
        return{
            ...state , prevmonth:action.payload
        }    
    case RESULT:
        return{
            ...state , result:action.payload
        }
    case RESULT_ERROR:
        return{
            ...state ,resulterror:action.payload
        }                                            
    default:
        return state;
}
};
export default student;