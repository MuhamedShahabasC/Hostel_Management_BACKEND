import asyncHandler from "express-async-handler";
import { PaymentService } from "../../services/Payment";
import { dataFormattor } from "../../utils/JSON-formattor";

const paymentService = new PaymentService();

// All payments after filtering if any
export const allPayments = asyncHandler(async (req, res) => {
  // Refactoring query
  const filterObj = { ...req.query };
  for (const filter in filterObj) {
    if (!filterObj[filter] || filter !== "refId") delete filterObj[filter];
  }
  if (filterObj.refId)
    filterObj.refId = {
      $regex: filterObj.refId,
      $options: "i",
    };
  const allPayments = await paymentService.allPayments(filterObj);
  res.json(dataFormattor(allPayments));
});
