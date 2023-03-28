import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";
import { login, staffSchema } from "./yupSchema";

// Validating req.body before reaching controller

// Login body validation
export const validateLogin: RequestHandler = asyncHandler(
  async (req, res, next) => {
    try {
      req.body = await login.validate(req.body);
      next();
    } catch (err: any) {
      throw ErrorResponses.unautharized(err.errors[0]);
    }
  }
);

// Staff body validation
export const validateStaff: RequestHandler = asyncHandler(
  async (req, res, next) => {
    try {
      req.body = await staffSchema.validate(req.body);
      next();
    } catch (err: any) {
      throw ErrorResponses.unautharized(err.errors[0]);
    }
  }
);
