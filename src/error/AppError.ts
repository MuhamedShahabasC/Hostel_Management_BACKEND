import { NextFunction, Request, Response } from "express";
import ErrorResponses from "./ErrorResponses";

export const appError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  // Custom and expected errors handler
  if (err instanceof ErrorResponses) {
    return res.status(err.StatusCode).json({
      status: "fail",
      operational: true,
      message: err.message,
    });
  }

  // Unexpected errors handler
  console.log(err)
  return res.status(500).json({
    status: "error",
    message: 'Something went wrong!',
  });

  // Error Handler for development
  // console.log(err);
  // return res.status(500).json({
  //   error: err,
  //   message: err.message,
  // });
};

export default appError;
