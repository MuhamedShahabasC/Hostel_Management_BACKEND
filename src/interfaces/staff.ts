import { Document } from "mongoose";

export interface IStaffAddress {
  building: string;
  city: string;
  pin: number;
  state: string;
  country: string;
}

export interface IStaff extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
  role: "warden" | "chef" | "maintenance";
  gender: "male" | "female";
  profilePic: string;
  address: IStaffAddress;
}
