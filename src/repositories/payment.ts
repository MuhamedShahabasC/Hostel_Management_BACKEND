import { Model } from "mongoose";
import { CRUD } from "./CRUD";
import { INewPayment, IPayment } from "../interfaces/payment";
import { PaymentModel } from "../models/payment";

export class PaymentRepo extends CRUD {
  model: Model<IPayment> = PaymentModel;

  // All Payments
  async allPaymentsWithStudent(filterObj: Object) {
    return await this.findAndPopulate({ path: "student", select: "name email" }, { ...filterObj });
  }

  // Create a new payment
  async createPayment(data: INewPayment): Promise<IPayment> {
    return this.create(data);
  }
}
