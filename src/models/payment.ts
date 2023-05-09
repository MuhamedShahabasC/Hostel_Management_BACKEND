import { Model, Schema, model } from "mongoose";
import { IPayment } from "src/interfaces/payment";

const paymentSchema = new Schema<IPayment>({
  student: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Payment must have a student"],
  },
  refId: {
    type: String,
    required: [true, "Reference ID is required"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Payment must have an amount"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  balancePayment: {
    type: Number,
    required: [true, "Please specify the balance amount of the student"],
  },
  paidPayment: {
    type: Number,
    required: [true, "Please specify the paid amount of the student"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export const PaymentModel: Model<IPayment> = model("Payment", paymentSchema);
