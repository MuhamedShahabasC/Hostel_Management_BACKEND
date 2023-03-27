import { NextFunction, Request, Response } from "express";
import ErrorResponses from "./ErrorResponses";

export const appError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorResponses) {
    return res.status(err.StatusCode).json({
      status: "fail",
      message: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};

export default appError;
