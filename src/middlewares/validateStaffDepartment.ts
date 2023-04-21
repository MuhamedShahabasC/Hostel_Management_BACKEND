import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";
import { TokenDepartment } from "../interfaces/auth";

// Validating staffs accessing staff routes
export const validateStaffRole = (inputDepartment: TokenDepartment): RequestHandler => {
  return expressAsyncHandler(async (req, res, next) => {
    if (!req.tokenPayload) throw ErrorResponses.unauthorized("Authorization required");
    if (req.tokenPayload.role !== "staff" || inputDepartment !== req.tokenPayload.department)
      throw ErrorResponses.unauthorized(`Route for ${inputDepartment} staff`);
    next();
  });
};
