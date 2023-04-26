import { ObjectId } from "mongoose";

export interface IRoom {
  number: number;
  code: string;
  student: any; // Change this after doing student schema;
  occupiedOn: Date;
  availability: boolean;
}

export interface IBlock {
  _id?: string;
  name: string;
  code: string;
  rooms: IRoom[];
  occupancy: number;
}
