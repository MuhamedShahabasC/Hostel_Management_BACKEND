import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";

// Validating and Sanitising req.body middleware with provided schema

export const validate = (schema: any): RequestHandler =>
  asyncHandler(async (req, res, next) => {
    try {
      req.body = await schema.validate(req.body, { stripUnknown: true });
      next();
    } catch (err: any) {
      throw ErrorResponses.unauthorized(err.errors?.[0]);
    }
  });
