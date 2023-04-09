import mongoose from "mongoose";
const { Schema } = mongoose;
const dateSchema = new Schema({
     attendance:{
      type: Schema.Types.ObjectId,
      ref: "attendances",
     },
     date:{
        type:String
     },
     month:{
      type:Number
     },
     time:{
        type:String
     },
     status:{
      type:String
     }
});


export default mongoose.model("date", dateSchema);
