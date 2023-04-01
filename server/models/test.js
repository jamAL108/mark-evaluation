import mongoose from "mongoose";
const test = mongoose.Schema({
    testname:{
       type:String,
       required:true,
       unique:true,
       lowercase:true,
       enum:["ia","midsem","practical","endsem"]
    },
    depart:{
        type:String,
        required:true,
    },
    subjectCode: {
        type: String,
        required: true,
      },
    totalmark:{
        type:Number,
        required:true,
        enum:[20,60,10]
    } ,
     year: {
        type: String,
        required: true,
      },
      section: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
})

const tests = mongoose.model("Test",test);
export default tests;