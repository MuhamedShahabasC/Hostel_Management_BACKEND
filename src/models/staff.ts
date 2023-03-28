import { model, Model, Schema } from "mongoose";
import { IStaff } from "../interfaces/IStaff";
import validator from "validator";

// STAFF Schema with Validation

const staffSchema = new Schema<IStaff>(
  {
    name: {
      type: String,
      required: [true, "A Staff must have a name."],
      minlength: [3, "Name must be longer than 3 characters"],
      maxlength: [20, "Name must be shorter than 20 characters"],
      trim: true,
      validate: {
        validator: validator.isAlpha as any,
        message: "Invalid Name",
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "A Staff must have an email."],
      validate: {
        validator: validator.isEmail as any,
        message: "Invalid e-Mail",
      },
    },
    password: {
      type: String,
      required: [true, "A Staff must have a password."],
    },
    mobile: {
      type: Number,
      required: [true, "A Staff must have an contact number."],
      validate: {
        validator: (number: any) => number.toString().length === 10,
        message: "Invalid phone number!",
      },
    },
    role: {
      type: String,
      enum: {
        values: ["warden"],
        message: "Invalid warden ({VALUE}) : Must be warden / ...",
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female"],
        message: "Invalid gender ({VALUE}) : Must be male or female.",
      },
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dqrnskj2b/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1679929217/staff-avatars/staff-default_azorqn.jpg",
    },
    address: {
      type: {
        building: {
          type: String,
          trim: true,
          required: [true, "Invalid building in Address"],
        },
        city: {
          type: String,
          trim: true,
          required: [true, "Invalid city in Address"],
        },
        pin: {
          type: Number,
          trim: true,
          required: [true, "Invalid pin in Address"],
        },
        state: {
          type: String,
          trim: true,
          required: [true, "Invalid state in Address"],
        },
        country: {
          type: String,
          trim: true,
          required: [true, "Invalid country in Address"],
        },
      },
      required: [true, "Invalid address"],
    },
  },
  { timestamps: true }
);

export const StaffModel: Model<IStaff> = model("Staff", staffSchema);
