import { Document } from "mongoose";

export interface IChiefWarden extends Document {
  name: string;
  email: string;
  password: string;
  mobile: number;
}
