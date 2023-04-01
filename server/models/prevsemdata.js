import mongoose from "mongoose";
const { Schema } = mongoose;
const prevsemdata = mongoose.Schema({
    student: {
        type: Schema.Types.ObjectId,
        ref: "Studentdetails",
    },
    result:{
        type:[{}]
    },
    kts:{
       type:[{}]
    }
})

export default mongoose.model("prevsemdata" , prevsemdata);