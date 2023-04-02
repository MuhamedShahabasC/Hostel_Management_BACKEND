import { RequestHandler } from "express";
import { StaffService } from "../services/staff";
import expressAsyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";

type role = "chef" | "warden" | "maintenance";

// Validating staffs accessing staff routes  
export const validateRole = (role: role): RequestHandler => {
  return expressAsyncHandler(async (req, res, next) => {
    const staffService = new StaffService();
    const currentStaff = await staffService.singleStaff(req.params.email);
    if (currentStaff.role !== role)
      throw ErrorResponses.unauthorized(`Route for ${role} staff`);
      next()
  });
};
