import mongoose from "mongoose";

const departmentSchema = mongoose.Schema({
  depart: {
    type: String,
    required: true,
  },
  departCode: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("department", departmentSchema);
