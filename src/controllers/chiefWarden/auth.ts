import { RequestHandler } from "express";
import appError from "../../error/AppError";
import ErrorResponses from "../../error/ErrorResponses";
import { CWAuthRepo } from "../../repositories/chiefWarden";
import asyncHandler from "express-async-handler";

const chiefWardenAuth = new CWAuthRepo();

export const login: RequestHandler = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email);
});
