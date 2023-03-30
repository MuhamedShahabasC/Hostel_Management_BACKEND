import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";

// Validating req.body before reaching controller and ignoring all unwanted data

export const validate = (schema: any): RequestHandler => {
  return asyncHandler(async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body, { stripUnknown: true });
      next();
    } catch (err: any) {
      throw ErrorResponses.unautharized(err.errors[0]);
    }
  });
};
