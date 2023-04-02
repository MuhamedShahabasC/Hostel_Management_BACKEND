import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { IStaff } from "../../interfaces/staff";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StaffAuth } from "../../repositories/staff.repository";
import { signToken } from "../../utils/tokenManager";

const staffAuth = new StaffAuth();

export const newStaff: RequestHandler = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, role, gender, address }: IStaff =
    req.body;
  const signUpData = {
    name,
    email,
    password,
    mobile,
    role,
    gender,
    address,
  };
  await staffAuth.signUp(signUpData, "staff");
  res.json(dataFormattor(`Signed up successfully`));
});

export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const staffData = await staffAuth.login<IStaff>(email, password);
  res.json({
    ...dataFormattor(staffData),
    token: signToken(staffData.password),
  });
});
