import { Model, Schema, model } from "mongoose";
import { IMealPlan } from "../interfaces/staff";
import validator from "validator";

const MealPlanSchema = new Schema<IMealPlan>(
  {
    title: {
      type: String,
      required: [true, "Meal plan must have a title"],
      maxlength: [15, "Title must be shorter than 15 characters"],
      minlength: [5, "Title must be longer than 5 characters"],
      validate: {
        validator: validator.isAlpha as any,
        message: "Title must be a string",
      },
    },
    price: {
      type: Number,
      required: [true, "Meal plan must have a price"],
      min: [1000, "Price must be min. 1000"],
      max: [10000, "Price must be max. 10000"],
    },
    breakfast: {
      type: String,
      required: [true, "Please specify breakfast"],
      maxlength: [100, "Max. 100  characters."],
      minlength: [5, "Min. 5  characters."],
    },
    lunch: {
      type: String,
      required: [true, "Please specify lunch"],
      maxlength: [100, "Max. 100  characters."],
      minlength: [5, "Min. 5  characters."],
    },
    evening: {
      type: String,
      required: [true, "Please specify lunch"],
      maxlength: [100, "Max. 100  characters."],
      minlength: [5, "Min. 5  characters."],
    },
    dinner: {
      type: String,
      required: [true, "Please specify lunch"],
      maxlength: [100, "Max. 100  characters."],
      minlength: [5, "Min. 5  characters."],
    },
    active: {
      type: Boolean,
      default: false,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const MealPlanModel: Model<IMealPlan> = model(
  "MealPlan",
  MealPlanSchema
);
