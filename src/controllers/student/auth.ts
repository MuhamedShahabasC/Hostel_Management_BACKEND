import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StudentAuth } from "../../repositories/student";
import { IStudent } from "../../interfaces/student";
import { signToken } from "../../utils/tokenManager";

// Student service
const service = new StudentAuth();

// Student sign up
export const newStudent = asyncHandler(async (req, res) => {
  const newAdmission = await service.signUp(req.body);
  res.json(dataFormattor(newAdmission));
});

// Login Student
export const login = asyncHandler(async (req, res) => {
  const { _id, email, profilePic, name, mobile }: IStudent = await service.login(
    req.body.email,
    req.body.password
  );
  res.json({
    ...dataFormattor({ _id, email, profilePic, name, mobile }),
    token: signToken(_id!, "student"),
  });
});

// Reset Password
export const resetPassword = asyncHandler(async (req, res) => {
  const resetPassword = await service.resetPassword(
    req.params.email,
    req.body.currentPassword,
    req.body.newPassword
  );
  res.json(dataFormattor(resetPassword));
});
