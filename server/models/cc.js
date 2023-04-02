import mongoose from "mongoose";
const { Schema } = mongoose;
const ccSchema = new Schema({
     faculty:{
      type: Schema.Types.ObjectId,
      ref: "Facultydetails",
     },
     name:{
        type:String
     },
     division:{
        type:String
     },
     year:{
      type:Number
     },
     depart:{
        tyep:String
     }
})


export default mongoose.model("CC", ccSchema);