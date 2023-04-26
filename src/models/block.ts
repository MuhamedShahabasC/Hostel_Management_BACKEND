import { model, Model, Schema } from "mongoose";
import { IBlock } from "src/interfaces/block";
import validator from "validator";

const blockSchema = new Schema<IBlock>({
  name: {
    type: String,
    required: [true, "Block must have a name."],
    minlength: [3, "Name must not be shorter than 3 characters"],
    maxlength: [20, "Name must not be longer than 20 characters"],
    validate: {
      validator: validator.isAlpha as any,
      message: "Invalid block name",
    },
    trim: true,
  },
  code: {
    type: String,
    required: [true, "Chief Warden must have a name."],
    maxlength: [1, "Name must not be longer than 1 character"],
    validate: { validator: validator.isAlpha as any, message: "Invalid Name" },
    trim: true,
  },
  occupancy: {
    type: Number,
    required: true,
  },
  rooms: [
    {
      code: {
        type: String,
        required: [true, "Room must have a code"],
        maxlength: [4, "Room code must be shorter than 4 character"],
        validate: {
          validator: (val: string) => val.length === 3,
          message: "Invalid room code",
        },
        trim: true,
      },
      number: {
        type: Number,
        required: [true, "Room must have a number."],
        validate: {
          validator: (number: any) => number > 0 && number <= 20,
          message: "Invalid room number",
        },
      },
      student: {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
      occupiedOn: Date,
      availability: {
        type: Boolean,
        default: true,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});

export const BlockModel: Model<IBlock> = model("Block", blockSchema);
