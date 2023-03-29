import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";

export const newNotice = asyncHandler(async (req, res) => {

  res.json(dataFormattor(req.body));
});
