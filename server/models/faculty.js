import  mongoose from "mongoose";
import  validator from "validator";
const facultydetails = mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   Gender:{
    type:String,
    lowercase:true,
    enum:["male","female"]
   },
   age:{
    type:Number,
    minlength:20,
    maxlength:60,
    required:true
   },
   email:{
    type:String,
    unique:true,
    required:true,
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("not a valid email")
        }
    }
   },
   password:{
    type:String,
    required:true,
    default:"dypatil@123"
   },
   depart:{
    type:String,
    required:true
   },
   passwordupdated:{
    type:Boolean,
    default:false
   },
   class:{
    type:[{}]
   },
   timetable:{
     type:[{}]
   },
   attempts:{
    type:Number,
    default:4
   },
   cc:{
    type:{}
   }
});

const FacultySetUp = mongoose.model("Facultydetails",facultydetails);

export default FacultySetUp;