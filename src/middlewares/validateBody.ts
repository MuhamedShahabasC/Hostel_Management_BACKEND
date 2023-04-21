import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";

// Validating and Sanitising req.body middleware

export const validate = (schema: any): RequestHandler =>
  asyncHandler(async (req, res, next) => {
    try {
      const tokenPayload = req.body?.tokenPayload;
      req.body = await schema.validate(req.body, { stripUnknown: true });
      if (tokenPayload) req.body.tokenPayload = tokenPayload;
      next();
    } catch (err: any) {
      throw ErrorResponses.unauthorized(err.errors[0]);
    }
  });
