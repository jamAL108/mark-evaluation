import  mongoose from "mongoose";
import { Schema } from "mongoose";
const Examination = mongoose.Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:"Studentdetails"
    },
    depart:{
        type:String,
        required:true
    },
    subjectCode:{
        type:String,
        required:true
    },
    mark:{
        type:Number,
        default:-1
    },    
    exam:{
        type:String
    }
})

export default mongoose.model("Examination",Examination);