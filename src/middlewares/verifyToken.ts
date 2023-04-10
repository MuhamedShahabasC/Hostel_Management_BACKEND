import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";
import { verifyToken } from "../utils/tokenManager";
import validator from "validator";
import { IToken } from "../interfaces/auth";

export const checkAuth = asyncHandler(async (req, res, next) => {
  if (!req.headers?.authorization)
    throw ErrorResponses.unauthorized("Access Denied");
  const token = req.headers.authorization.replace("Bearer ", "");
  const { _id } = verifyToken(token) as IToken;
  if (!_id || !validator.isMongoId(_id)) throw ErrorResponses.badRequest();
  next()
});


