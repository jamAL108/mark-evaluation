import  mongoose from "mongoose";
import { Schema } from "mongoose";
const result = mongoose.Schema({
    student:{
        type:Schema.Types.ObjectId,
        ref:"Studentdetails"
    },
    grandtotal:{
        type:Number
    },
    totalcredit:{
        type:Number
    },
    totalCxG:{
        type:Number
    },
    SGPI:{
        type:Number
    },
    listofkt:
    {
        type:[]
    },
    kt:{
        type:Boolean
    },
    subjects:{
        type:[]
    },
    practical:{
        type:[]
    },
    totalsubject:{
        type:Number
    }
});

export default mongoose.model("Result",result);