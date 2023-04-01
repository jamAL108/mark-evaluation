import mongoose from "mongoose";
import { Schema } from "mongoose";
const subject = mongoose.Schema({
   subjectName: {
      type: String,
      required: true,
      trim: true,
    },
    subjectCode: {
      type: String,
      required: true,
    },
    depart: {
      type: String,
      required: true,
    },
    totalLectures: {
      type: Number,
      default: 10,
    },
    year: {
      type: Number,
      required: true,
    },
    attendence: {
      type: Schema.Types.ObjectId,
      ref: "attendence",
    },
})
const subjects = mongoose.model("Subject",subject);

export default subjects;