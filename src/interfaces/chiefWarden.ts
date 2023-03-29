import { Document } from "mongoose";

export interface IChiefWarden extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
}

export interface INotice {
  title: string;
  message: string;
  audience: {
    staff: boolean;
    student: boolean;
  };
  date: Date;
}