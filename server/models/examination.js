import  mongoose from "mongoose";
import { Schema } from "mongoose";
const Examination = mongoose.Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:"Studentdetails"
    },
    depart:{
        type:String
    },
    exam:{
        type:String
    },
    subjectCode:{
        type:String
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
        type:Number,
        default:-1
    }
})

export default mongoose.model("Examination",Examination);