import { RequestHandler } from "express";
import ErrorResponses from "../error/ErrorResponses";
import validator from "validator";

// Middleware to validate MongoDB ID in Params

export const validate_id: RequestHandler = (req, res, next) => {
  const { _id } = req.params;
  if (!validator.isMongoId(_id)) throw ErrorResponses.badRequest();
  next()
};
