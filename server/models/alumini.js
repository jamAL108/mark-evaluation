import mongoose from "mongoose";
const alumini = mongoose.Schema({
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
   depart:{
    type:String,
    required:true
   },
   batch:{
    type:Number,
    required:true
   }
});

export default mongoose.model("alumini",alumini);

