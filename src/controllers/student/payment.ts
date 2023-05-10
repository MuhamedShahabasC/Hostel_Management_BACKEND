import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { instance } from "../../config/razorpay";
import ErrorResponses from "../../error/ErrorResponses";
import * as crypto from "crypto";
import { StudentService } from "../../services/student";
import { PaymentService } from "../../services/Payment";
import { INewPayment } from "src/interfaces/payment";

const studentService = new StudentService();
const paymentService = new PaymentService();

// All payments by student
export const allPayments = asyncHandler(async (req, res) => {
  const allPayments = await paymentService.allPaymentsOfStudent(req.tokenPayload?._id!);
  res.json(dataFormattor(allPayments));
});

// Initiating a new payment
export const initiatePayment = asyncHandler(async (req, res) => {
  const options = {
    amount: req.body?.amount ? +req.body?.amount * 100 : 0,
    currency: "INR",
    payment_capture: 1,
  };
  const orderDetails = await instance.orders.create(options);
  if (!orderDetails) throw ErrorResponses.customError("Payment failed");
  res.json(dataFormattor(orderDetails));
});

// Successful payment
export const successfulPayment = asyncHandler(async (req, res) => {
  const { orderCreationId, razorpayPaymentId, razorpaySignature, amount } = req.body;
  const signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET as string)
    .update(`${orderCreationId}|${razorpayPaymentId}`)
    .digest("hex");
  if (signature !== razorpaySignature) throw ErrorResponses.customError("Transcation is not legit");
  const { paidPayment, balancePayment } = await studentService.addPayment(
    req.tokenPayload?._id!,
    +amount
  );
  const newPaymentData: INewPayment = {
    student: req.tokenPayload?._id!,
    refId: razorpayPaymentId.replace("pay_", ""),
    amount: +amount / 100,
    date: Date.now(),
    balancePayment: balancePayment,
    paidPayment: paidPayment,
  };
  await paymentService.newPayment(newPaymentData);
  res.json(dataFormattor(`Payment of ₹${+amount / 100} Successful`));
});
