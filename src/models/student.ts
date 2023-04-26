import { isValidObjectId, model, Model, Schema } from "mongoose";
import { IStudent } from "../interfaces/student";
import validator from "validator";

// Student Schema with Validation

const studentSchema = new Schema<IStudent>(
  {
    name: {
      type: String,
      required: [true, "A student must have a name."],
      minlength: [3, "Name must be longer than 3 characters"],
      maxlength: [20, "Name must be shorter than 20 characters"],
      trim: true,
      validate: {
        validator: (name: string) => validator.isAlpha(name.trim().replaceAll(" ", "")),
        message: "Invalid Name",
      },
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "A student must have an email."],
      validate: {
        validator: function (email: string) {
          return /[a-z0-9]+@[a-z0-9]+.com/i.test(email);
        },
        message: "Invalid e-Mail",
      },
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: {
        values: ["science", "humanities", "commerce"],
        message: "Invalid department ({VALUE})",
      },
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: {
        values: ["male", "female"],
        message: "Invalid gender ({VALUE})",
      },
    },
    password: {
      type: String,
      required: [true, "A student must have a password."],
    },
    mobile: {
      type: Number,
      required: [true, "A student must have an contact number."],
      validate: {
        validator: (number: number) => number.toString().length === 10,
        message: "Invalid mobile number",
      },
    },
    guardianName: {
      type: String,
      required: [true, "A student must have a guardian name."],
      minlength: [3, "Guardian name must be longer than 3 characters"],
      maxlength: [20, "Guardian name must be shorter than 20 characters"],
      trim: true,
      validate: {
        validator: (name: string) => validator.isAlpha(name.trim().replaceAll(" ", "")),
        message: "Invalid guardian name",
      },
    },
    guardianMobile: {
      type: Number,
      required: [true, "A guardian must have an contact number."],
      validate: {
        validator: (number: number) => number.toString().length === 10,
        message: "Invalid mobile number",
      },
    },
    profilePic: {
      type: String,
      default:
        "https://res.cloudinary.com/dqrnskj2b/image/upload/q_100/v1681203536/Hostel%20Management%20Project/UI/icons/default-avatar_ctvrbx.webp",
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
    bloodGroup: {
      type: String,
      required: [true, "Blood group is required"],
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "Invalid blood group ({VALUE})",
      },
    },
    remarks: {
      type: String,
      minlength: [4, "Remarks must be longer than 4 characters"],
      maxlength: [250, "Remarks must be shorter than 250 characters"],
      trim: true,
    },
    room: {
      type: String,
      trim: true,
      validate: {
        validator: (roomCode: string) => roomCode.trim().length === 3,
        message: "Invalid room code",
      },
    },
    block: {
      type: Schema.Types.ObjectId,
      ref: "Block",
      validate: {
        validator: (blockId: string) => isValidObjectId(blockId),
        message: "Invalid Block",
      },
    },
    mealPlan: {
      type: Schema.Types.ObjectId,
      ref: "MealPlan",
      validate: {
        validator: (mealPlanId: string) => isValidObjectId(mealPlanId),
        message: "Invalid Meal Plan",
      },
    },
    status: {
      type: String,
      default: "pending",
      enum: {
        values: ["pending", "rejected", "resident", "departed"],
        message: "Invalid status ({VALUE})",
      },
    },
  },
  { timestamps: true }
);

export const StudentModel: Model<IStudent> = model("Student", studentSchema);
