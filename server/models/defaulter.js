import  mongoose from "mongoose";
import { Schema } from "mongoose";
const Defaulter = mongoose.Schema({
    year:{
        type:Number,
        required:true
    },
    division:{
        type:String,
        required:true
    },
    depart:{
        type:String,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    defaulter:{
        type:[{}],
        required:true
    },
    status:{
        type:Boolean,
        required:true
    }
})

export default mongoose.model("defaulter" , Defaulter);