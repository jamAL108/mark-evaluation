import  mongoose from "mongoose";
import { Schema } from "mongoose";
const Defaulter = mongoose.Schema({
    year:{
        type:Number
    },
    division:{
        type:String
    },
    depart:{
        type:String
    },
    month:{
        type:Number
    },
    defaulter:{
        type:[{}]
    }
})

export default mongoose.model("defaulter" , Defaulter);