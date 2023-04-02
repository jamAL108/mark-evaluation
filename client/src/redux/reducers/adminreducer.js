import {
    ADD_DEPARTMENT,
    LOGOUT
   , ADD_FACULTY
   , GET_ALL_FACULTY 
   , ADD_SUBJECT 
   , GET_ALL_SUBJECT
   , ADD_STUDENT
   , GET_ALL_STUDENT 
   , GET_SUBJECT 
   , GET_ALL_DEPARTMENT 
   ,CREATE_NOTICE
   ,GET_NOTICE,
   FACULTY_LOGIN,
   CCS ,
   GENERATE_DEFUALTER
   , ADD_FACULTY_ERROR
   , GET_ALL_FACULTY_ERROR 
   , ADD_SUBJECT_ERROR 
   , GET_ALL_SUBJECT_ERROR
   , ADD_STUDENT_ERROR
   , GET_ALL_STUDENT_ERROR 
   , GET_SUBJECT_ERROR 
   ,CREATE_NOTICE_ERROR
   ,GET_NOTICE_ERROR,
   INITIATE_CLASS,
   INITIATE_CLASS_ERROR,
   CHANGE_TIMER,
   UPGRADE_YEAR,
   UPGRADE_YEAR_ERROR,
   YEAR_UPDATE ,  
    ODD_SEM_UPDATE , ODD_SEM_UPDATE_ERROR,
    EVEN_SEM_UPDATE ,  EVEN_SEM_UPDATE_ERROR
} from '../actiontype';

const initialstate ={
    authordata:null,
    facultydeleted:false,
    studentdeleted:false,
    departmentdeleted:false,
    notices:[],
    faculties:[],
    students:[],
    subjects:[],
    getsubjecterror:"",
    logout:false,
    defaulter:false,
    timer:29,
    ccs:[],
    alldepartments:["MECH" , "IT" , "CSE" , "ECE"],
    departmentadded:false,
    studentadded:false,
    facultyadded:false,
    noticeadded:false,
    subjectadded:false,
    subjectadderror:"",
    getfaculties:false,
    getstudent:false,
    addfacultyerror:"",
    addstudenterror:"",
    getfacultyerror:"",
    getstudenterror:"",
    addsubjecterror:"",
    createnoticeerror:"",
    getnoticeerror:"",
    getsubjecterror:"",
    initialclass:false,
    initialclasserror:"",
    yearupdated:false,
    oddsemupdated:false,
    evensemupdated:false,

}

const admin =  (state=initialstate , action)=>{
   switch(action.type){
    // case FACULTY_LOGIN:
    //     localStorage.setItem("user", JSON.stringify({ ...action?.payload }));
    //     console.log("hi im jamal");
    //     return { ...state, authData: action?.payload };
    case LOGOUT :
         localStorage.clear();
    case ADD_FACULTY:
        return{
            ...state , facultyadded:action.payload
        }
    case ADD_STUDENT:
        return{
            ...state,
            studentadded:action.payload
        }
    case ADD_STUDENT_ERROR:
        return{
            ...state , addstudenterror:action.payload
        }    
        case ADD_FACULTY_ERROR:
        return{
            ...state , addfacultyerror:action.payload
        }   
        case CREATE_NOTICE:
            return{
                ...state , noticeadded:action.payload
            }    
        case CREATE_NOTICE_ERROR:
            return{
                    ...state , createnoticeerror:action.payload
                }
        case GET_ALL_FACULTY:
            return{
                    ...state , faculties:action.payload
                }
        case GET_ALL_FACULTY_ERROR:
            return{
                    ...state , getfacultyerror:action.payload
                }
        case CCS:
            return{
                ...state , ccs:action.payload
            }        
        case GET_ALL_STUDENT:
            return{
                    ...state , students:action.payload
                }
        case GET_ALL_STUDENT_ERROR:
            return{
                    ...state , getstudenterror:action.payload
                }  
        case ADD_SUBJECT:
            return {
                ...state , subjectadded:action.payload
            }
        case ADD_SUBJECT_ERROR:
            return{
                ...state , subjectadderror:action.payload
            }               
        case GET_SUBJECT:
            return{
                ...state , subjects:action.payload
            }
        case GET_SUBJECT_ERROR:
            return{
                ...state , getsubjecterror:action.payload
            }  
        case INITIATE_CLASS:
            return{
                ...state , initialclass:action.payload
            }   
        case INITIATE_CLASS_ERROR:
            return {
                ...state , initialclasserror:action.payload
            }
        case GENERATE_DEFUALTER:
            return{
                ...state , defaulter:action.payload
            }
        case CHANGE_TIMER:
            return{
                ...state , timer:action.payload
            }
        case UPGRADE_YEAR:
             return{
                ...state , students:action.payload
             }
        case UPGRADE_YEAR_ERROR:
            return{
                ...state , getstudenterror:action.payload
            }
        case YEAR_UPDATE:
            return{
                ...state , yearupdated:action.payload
            }   
        case ODD_SEM_UPDATE:
            return {
                ...state , oddsemupdated:action.payload
            }
       case EVEN_SEM_UPDATE:
            return {
                    ...state , evensemupdated:action.payload
            }               
    default:
        return state;           
   }
}

export default admin;

