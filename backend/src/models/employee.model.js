import mongoose from "mongoose";
const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    salary: {
      type: Number,
      required: true
    },
    desgination: {
      type: String,
      required: true
    },
    dataOfJoining: {
      type: Date,
      required: true
    },
    dataOfBirth: {
      type: Date,
      required: true
    },
    dept: {
      type: String,
      required: true
    },
    emailId: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    }
  },
  { timestamps: true }
);

// employeeSchema.createIndex({ emailId: 1 });

const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
