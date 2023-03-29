import { Document } from "mongoose";

export interface IStaff extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
  role: "warden";
  gender: "male" | "female";
  profilePic: string;
  address: {
    building: string;
    city: string;
    pin: number;
    state: string;
    country: string;
  };
}
