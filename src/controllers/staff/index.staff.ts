import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { IStaff } from "../../interfaces/IStaff";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StaffRepo } from "../../repositories/staff.repository";

const staffAuth = new StaffRepo();

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
  res.json(dataFormattor("Signed Up"));
});
