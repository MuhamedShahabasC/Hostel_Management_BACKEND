import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";
import { TokenDepartment } from "../interfaces/auth";

// Validating staffs accessing staff routes
export const validateStaffRole = (inputDepartment: TokenDepartment): RequestHandler => {
  return expressAsyncHandler(async (req, res, next) => {
    const {
      tokenPayload: { role, department },
    } = req.body;
    if (role !== "staff" || inputDepartment !== department)
      throw ErrorResponses.unauthorized(`Route for ${inputDepartment} staff`);
    next();
  });
};
