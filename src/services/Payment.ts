import ErrorResponses from "../error/ErrorResponses";
import { INewPayment, IPayment } from "../interfaces/payment";
import { PaymentRepo } from "../repositories/payment";

export class PaymentService extends PaymentRepo {
  // All payments
  async allPayments(filterObj?: any): Promise<IPayment[]> {
    const allPayments = await this.allPaymentsWithStudent({ ...filterObj });
    if (allPayments.length === 0) throw ErrorResponses.noDataFound("payments");
    return allPayments;
  }

  // All payments of single student
  async allPaymentsOfStudent(student: string): Promise<IPayment[]> {
    return await this.allPayments({ student });
  }

  // New payment
  async newPayment(data: INewPayment): Promise<IPayment> {
    return this.createPayment(data);
  }
}
