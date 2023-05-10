import { Document, ObjectId } from "mongoose";

export interface IPayment extends Document {
  student: ObjectId;
  refId: string;
  amount: number;
  date: Date;
  balancePayment: number;
  paidPayment: number;
}

export interface INewPayment {
  student: string;
  refId: string;
  amount: number;
  date: number;
  balancePayment: number;
  paidPayment: number;
}
