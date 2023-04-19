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
    termwork:{
        type:Number,
        default:-1
    },
    orals:{
        type:Number,
        default:-1
    },
    credits:{
        type:String
    },
    exam:{
        type:String,
        required:true
    }
})

export default mongoose.model("Examination",Examination);