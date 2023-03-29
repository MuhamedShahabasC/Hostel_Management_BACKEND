import { RequestHandler } from "express";
import { CWAuthRepo } from "../../repositories/chiefWarden";
import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { signToken } from "../../utils/tokenManager";
import { IChiefWarden } from "../../interfaces/chiefWarden";

const chiefWardenAuth = new CWAuthRepo();

export const login: RequestHandler = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userData = await chiefWardenAuth.login<IChiefWarden>(email, password);
  res.json({ ...dataFormattor(userData), token: signToken(userData.password) });
});
