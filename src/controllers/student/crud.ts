import asyncHandler from "express-async-handler";
import { StudentService } from "../../services/student";
import { dataFormattor } from "../../utils/JSON-formattor";

// Student service
const service = new StudentService();

// Get single student data
export const singleStudent = asyncHandler(async (req, res) => {
  const studentData = await service.singleStudentData(req.tokenPayload?.email!);
  res.json(dataFormattor(studentData));
});
