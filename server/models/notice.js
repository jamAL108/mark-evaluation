import mongoose from "mongoose";
const notice = mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    too:{
        type:String
    },
    from:{
        type:String,
        default:"admin"
    },
    content:{
        type:String,
        required:true
    }
})

const Createnotice = mongoose.model("addnotice", notice);

export default Createnotice;