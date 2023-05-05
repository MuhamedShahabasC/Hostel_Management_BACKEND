import { ObjectId } from "mongoose";

export interface IComplaint extends IComplaintInput {
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
