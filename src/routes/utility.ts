import ErrorResponses from "../error/ErrorResponses";
import asyncHandler from "express-async-handler";
import { verifyToken } from "../utils/tokenManager";
import { IToken } from "../interfaces/auth";
import { dataFormattor } from "../utils/JSON-formattor";

// Handling 404 endpoints
export const endPointNotFound = asyncHandler(async (req, res) => {
  throw ErrorResponses.endPointNotFound(req.originalUrl);
});

// Verify authorization headers
export const verifyAuth = asyncHandler(async (req, res) => {
  try {
    if (!req.headers?.authorization) throw ErrorResponses.unauthorized("Authorization required");
    const token = req.headers.authorization.replace("Bearer ", "");
    const { _id } = verifyToken(token) as IToken;
    res.json(dataFormattor("Authorized User"));
  } catch (error) {
    throw ErrorResponses.unauthorized("Access Denied");
  }
});
