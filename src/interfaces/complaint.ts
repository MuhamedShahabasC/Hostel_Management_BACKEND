import { Document, ObjectId } from "mongoose";

export interface IComplaint extends IComplaintInput {
  createdAt?: string;
  updatedAt?: string;
  remarks?: string;
}

export interface IComplaintPopulated extends Document {
  student: {
    _id: ObjectId;
    email: string;
  };
  message: string;
  status: "initiated" | "rejected" | "issued" | "resolved" | "approval";
  staff: {
    _id: ObjectId;
    email: string;
    name: string;
  };
  department: "maintenance" | "chef" | "warden";
  createdAt?: string;
  updatedAt?: string;
  remarks?: string;
}

export interface IComplaintInput {
  student: ObjectId;
  message: string;
  status: "initiated" | "rejected" | "issued" | "resolved" | "approval";
  staff: ObjectId;
  department: "maintenance" | "chef" | "warden";
}
