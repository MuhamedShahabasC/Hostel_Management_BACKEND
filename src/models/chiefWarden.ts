import { Schema , Model, model } from "mongoose";
import { IChiefWarden } from "../interfaces/IChiefWarden";
import validator from "validator";

// Chief Warden Schema with Validation

const chiefWardenSchema = new Schema<IChiefWarden>({
  name: {
    type: String,
    required: [true, "Chief Warden must have a name."],
    minlength: [3, "Name must not be shorter than 3 characters"],
    maxlength: [20, "Name must not be longer than 20 characters"],
    validate: { validator: validator.isAlpha as any, message: "Invalid Name" },
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: [true, "Chief Warden must have an email."],
    validate: { validator: validator.isEmail as any, message: "Invalid e-Mail" },

  },
  password: {
    type: String,
    required: [true, "Chief Warden must have a password."],
  },
  mobile: {
    type: Number,
    required: [true, "Chief Warden must have an contact number."],
    validate: {
      validator: (number: any) => number.toString().length === 10,
      message: "Invalid phone number!",
    },
  },
});

export const ChiefWardenModel: Model<IChiefWarden> = model(
  "ChiefWarden",
  chiefWardenSchema
);
