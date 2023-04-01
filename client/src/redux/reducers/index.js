import { combineReducers } from "redux";
import AdminReducer from "./adminreducer";
import ErrorReducer from "./errorreducer.js";
import FacultyReducer from "./facultyreducer";
import StudentReducer from "./studentreducer";

export default combineReducers({
  admin: AdminReducer,
  errors: ErrorReducer,
  faculty: FacultyReducer,
  student: StudentReducer,
});
