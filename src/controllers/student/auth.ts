import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StudentAuth } from "../../repositories/student";

// Student service
const service = new StudentAuth()

// Student sign up
export const newStudent = asyncHandler(async (req, res) => {
  const newAdmission = await service.signUp(req.body);
  res.json(dataFormattor(newAdmission));
});

// Login Student
export const login = asyncHandler(async (req, res) => {

  res.json('login auth controller')
})