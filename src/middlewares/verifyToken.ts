import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";
import { verifyToken } from "../utils/tokenManager";
import validator from "validator";
import { IToken, TokenRole } from "../interfaces/auth";

// Middleware to verify token and attach payload to body
export const checkAuth = (inputRole: TokenRole) =>
  asyncHandler(async (req, res, next) => {
    if (!req.headers?.authorization) throw ErrorResponses.unauthorized("Authorization required");
    const token = req.headers.authorization.replace("Bearer ", "");
    const { _id, email, role, department } = verifyToken(token) as IToken;
    if (role !== inputRole) throw ErrorResponses.unauthorized(`Route for ${inputRole}`);
    if (!_id || !validator.isMongoId(_id)) throw ErrorResponses.badRequest();
    req.body.tokenPayload = { _id, email, role, department };
    next();
  });
