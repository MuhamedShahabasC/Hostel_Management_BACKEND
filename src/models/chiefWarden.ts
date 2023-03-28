import { Schema } from "mongoose";
import { Model, model } from "mongoose";
import { IChiefWarden } from "src/interfaces/IChiefWarden";

const chiefWardenSchema = new Schema<IChiefWarden>({
  name: {
    type: String,
    required: [true, "Chief Warden must have a name."],
    minlength: [3, "Name must not be shorter than 3 characters"],
    maxlength: [20, "Name must not be longer than 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Chief Warden must have an email."],
  },
  password: {
    type: String,
    required: [true, "Chief Warden must have a password."],
  },
  mobile: {
    type: Number,
    required: [true, "Chief Warden must have an contact number."],
  },
});

export const ChiefWardenModel: Model<IChiefWarden> = model(
  "ChiefWarden",
  chiefWardenSchema
);
