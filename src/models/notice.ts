import { model, Model, Schema } from "mongoose";
import { INotice } from "../interfaces/chiefWarden";

const noticeSchema = new Schema<INotice>({
  title: {
    type: String,
    required: [true, "Notice must have a name"],
  },
  message: {
    type: String,
    required: [true, "Notice must have a message"],
    maxlength: [200, "Maximum 200 characters"],
  },
  audience: {
    type: {
      student: {
        type: Boolean,
        required: [true, "Specify audience"],
      },
      staff: {
        type: Boolean,
        required: [true, "Specify audience"],
      },
    },
    required: [true, "Notice must have a audience"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

export const NoticeModel: Model<INotice> = model("Notice", noticeSchema);
