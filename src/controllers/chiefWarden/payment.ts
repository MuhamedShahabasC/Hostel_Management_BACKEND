import asyncHandler from "express-async-handler";
import { PaymentService } from "../../services/Payment";
import { dataFormattor } from "../../utils/JSON-formattor";

const service = new PaymentService();

export const yearlyRevenue = asyncHandler(async (req, res) => {
  const yearlyRevenue = await service.yearlyRevenue();
  res.json(dataFormattor(yearlyRevenue));
});
