import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StudentService } from "../../services/student";

// Student service
const service = new StudentService();

// Student sign up
export const newStudent = asyncHandler(async (req, res) => {
  const newAdmission = await service.newAdmission(req.body);
  res.json(dataFormattor(newAdmission));
});
