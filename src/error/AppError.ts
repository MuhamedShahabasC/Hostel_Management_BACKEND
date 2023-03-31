import { NextFunction, Request, Response } from "express";
import ErrorResponses from "./ErrorResponses";

export const appError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // // Error Handler for development
  // console.log(err);
  // return res.status(500).json({
  //   error: err,
  //   message: err.message,
  // });

  // Custom and expected errors handler
  if (err instanceof ErrorResponses) {
    return res.status(err.StatusCode).json({
      status: "fail",
      operational: true,
      message: err.message,
    });
  }

  // Mongo Validation Error Handler
  if (err.name === "ValidationError") {
    const mongoError: any = err;
    const validationError: any = Object.values(mongoError.errors);
    return res.status(403).json({
      status: "fail",
      operational: true,
      message: validationError[0].message,
    });
  }

  // Unexpected error handler
  console.log(err);
  return res.status(500).json({
    status: "error",
    operational: false,
    message: "Something went wrong!",
  });
};

export default appError;
