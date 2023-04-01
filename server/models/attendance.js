import mongoose from "mongoose";
const { Schema } = mongoose;
const attendenceSchema = new Schema({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Studentdetails",
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
  },
  year:{
    type:String
  },
  depart:{
    type:String
  },
  division:{
    type:String
  },
  totalLecturesByFaculty: {
    type: [{}]
  },
  lectureAttended: {
    type: [{}]
  },
  defaulter:{
    type:Boolean
  }
});

export default mongoose.model("attendance", attendenceSchema);
