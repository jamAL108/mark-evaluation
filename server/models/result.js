import  mongoose from "mongoose";

const result = mongoose.Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:"Studentdetails"
    },
    subjects:{
       type:[]
    },
    subjectmarks:{
        type:[{}]
    },
    attendance:{
        type:Number
    },
    SGPI:{
        type:Number,
        required:true
    },
    kt:{
        type:Number,
        default:0
    },
    ktsubject:{
        type:[{}]
    }
});

export default mongoose.model("Result",result);