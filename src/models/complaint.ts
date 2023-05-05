import { isValidObjectId, model, Model, Schema } from "mongoose";
import { IComplaint } from "../interfaces/complaint";

// Complaint Model
const complaintSchema = new Schema<IComplaint>(
  {
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      validate: {
        validator: (studentID: string) => isValidObjectId(studentID),
        message: "Invalid student",
      },
    },
    department: {
      type: String,
      required: true,
      enum: {
        values: ["maintenance", "chef", "warden"],
        message: "Invalid department ({VALUE})",
      },
    },
    message: {
      type: String,
      required: [true, "Complaint must have a message"],
      minlength: [10, "Minimum 10 characters"],
      maxlength: [200, "Maximum 200 characters"],
    },
    status: {
      type: String,
      default: "initiated",
      enum: {
        values: ["initiated", "approval", "rejected", "issued", "resolved"],
        message: "Invalid status ({VALUE})",
      },
    },
    staff: {
      type: Schema.Types.ObjectId,
      ref: "Staff",
      validate: {
        validator: (staffID: string) => isValidObjectId(staffID),
        message: "Invalid staff",
      },
    },
    remarks: {
      type: String,
      minlength: [4, "Remarks must be longer than 4 characters"],
      maxlength: [250, "Remarks must be shorter than 250 characters"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ComplaintModel: Model<IComplaint> = model("Complaint", complaintSchema);
