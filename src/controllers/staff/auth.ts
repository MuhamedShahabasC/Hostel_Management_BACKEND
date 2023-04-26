import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { IStaff } from "../../interfaces/staff";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StaffAuth } from "../../repositories/staff";
import { signToken } from "../../utils/tokenManager";

const staffAuth = new StaffAuth();

// New Staff
export const newStaff: RequestHandler = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, role, gender, address }: IStaff = req.body;
  const signUpData = {
    name,
    email,
    password,
    mobile,
    role,
    gender,
    address,
  };
  await staffAuth.signUp(signUpData);
  res.json(dataFormattor(`Signed up successfully`));
});

// Login staff
export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { _id, email, mobile, name, role, profilePic } = await staffAuth.login<IStaff>(
    req.body.email,
    req.body.password
  );
  res.json({
    ...dataFormattor({
      _id,
      email,
      name,
      mobile,
      profilePic,
      department: role,
    }),
    token: signToken(_id, email, "staff", role),
  });
});

// Reset Password
export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const result = await staffAuth.resetPassword(
    req.tokenPayload?.email!,
    req.body.currentPassword,
    req.body.newPassword
  );
  res.json(dataFormattor(result));
});