import { ObjectId } from "mongoose";

export interface IStudent {
  _id?: ObjectId;
  name: string;
  email: string;
  department: "science" | "humanities" | "commerce";
  gender: "male" | "female";
  password: string;
  mobile: number;
  guardianName: string;
  guardianMobile: number;
  profilePic?: string;
  address: {
    building: string;
    city: string;
    pin: number;
    state: string;
    country: string;
  };
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  remarks?: string;
  room: string;
  block: ObjectId;
  mealPlan: ObjectId;
  status?: "pending" | "resident" | "suspended" | "departed";
}
