import mongoose from "mongoose";
const { Schema } = mongoose;
const studentdetails = mongoose.Schema({
   name:{
    type:String,
    required:true
   },
   Gender:{
    type:String,
    lowercase:true,
    enum:["male","female"]
   },
   dob: {
      type: String,
      required: true,
    },
   Rollno:{
    type:String,
    required:true,
   },
   email:{
      type:String
   },
   password:{
    type:String,
    default:"dypatil@123"
   },
   depart:{
    type:String,
    required:true
   },
   year:{
    type:Number,
    required:true
   },
   division:{
    type:String,
    required:true
   },
   subject:[{
    type:Schema.Types.ObjectId,
    ref:"Subject",
   },
],
batch:{
   type:String,
   required:true
},
passwordupdated:{
 type:Boolean,
 default:false
},
currentsem:{
   type:Number,
   default:0
}
});

const StudentSetUp = mongoose.model("Studentdetails",studentdetails);

export default StudentSetUp;