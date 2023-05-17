import { Model } from "mongoose";
import { CRUD } from "./CRUD";
import { INewPayment, IPayment } from "../interfaces/payment";
import { PaymentModel } from "../models/payment";

export class PaymentRepo extends CRUD {
  model: Model<IPayment> = PaymentModel;

  // All Payments
  protected async allPaymentsWithStudent(filterObj: Object) {
    return await this.findAndPopulate({ path: "student", select: "name email" }, { ...filterObj });
  }

  // Create a new payment
  protected async createPayment(data: INewPayment): Promise<IPayment> {
    return this.create(data);
  }

  // Yearly revenue
  protected async yearlyRevenueDataByYear(year?: number) {
    const aggregatedResult = await this.model.aggregate([
      {
        $project: {
          _id: 0,
          amount: "$amount",
          month: {
            $month: "$date",
          },
          year: {
            $year: "$date",
          },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalPayments: { $sum: 1 },
          revenue: {
            $sum: "$amount",
          },
        },
      },
      {
        $match: {
          "_id.year": year || new Date().getFullYear(),
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
    ]);
    return aggregatedResult;
  }
}
