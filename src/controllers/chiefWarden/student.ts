import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StudentService } from "../../services/student";

// Student Service
const studentService = new StudentService();

// Get all students data
export const allStudentsData = asyncHandler(async (req, res) => {
  const allStudentsData = await studentService.allStudentsData();
  res.json(dataFormattor(allStudentsData));
});
