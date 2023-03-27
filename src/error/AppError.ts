import { NextFunction, Request, Response } from "express";
import ErrorResponses from "./ErrorResponses";

export const appError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorResponses) {
    return res.status(err.StatusCode).json(err.message);
  }
  return res.status(500).json(err.message);
};

export default appError;
