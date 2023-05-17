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

  // Yearly revenue
  async yearlyRevenue(): Promise<{ month: number; totalPayments: number; revenue: number }[]> {
    const revenueData = await this.yearlyRevenueDataByYear();
    const yearlyData: { month: number; totalPayments: number; revenue: number }[] = [];
    for (let i = 1; i <= 12; i++) {
      yearlyData.push({ month: i, totalPayments: 0, revenue: 0 });
    }
    revenueData.forEach((monthlyData) => {
      yearlyData[monthlyData._id.month - 1].totalPayments = monthlyData.totalPayments;
      yearlyData[monthlyData._id.month - 1].revenue = monthlyData.revenue;
    });
    return yearlyData;
  }
}
