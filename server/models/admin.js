import mongoose from "mongoose";
const admin = mongoose.Schema({
     email:{
        type:String
     },
     password:{
        type:String
     }
});

export default mongoose.model("admin", admin);