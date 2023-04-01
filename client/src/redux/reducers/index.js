import { combineReducers } from "redux";
import AdminReducer from "./adminreducer";
import FacultyReducer from "./facultyreducer";
import StudentReducer from "./studentreducer";

export default combineReducers({
  admin: AdminReducer,
  faculty: FacultyReducer,
  student: StudentReducer,
});
