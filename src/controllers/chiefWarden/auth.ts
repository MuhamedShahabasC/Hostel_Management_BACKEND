import { RequestHandler } from "express";
import { ChiefWardenRepo } from "../../repositories/chiefWarden";
import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { signToken } from "../../utils/tokenManager";
import { IChiefWarden } from "../../interfaces/chiefWarden";

const chiefWarden = new ChiefWardenRepo();

// Login Chief warden
export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { mobile, email, name, _id, password } =
    await chiefWarden.login<IChiefWarden>(req.body.email, req.body.password);
  res.json({
    ...dataFormattor({ mobile, email, name, _id }),
    token: signToken(password),
  });
});

// Reset Password
export const resetPassword: RequestHandler = asyncHandler(async (req, res) => {
  const result = await chiefWarden.resetPassword(
    req.params.email,
    req.body.currentPassword,
    req.body.newPassword
  );
  res.json(dataFormattor(result));
});
