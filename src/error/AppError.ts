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
  // if (err.message === "ValidationError")
  //   return res
  //     .status(403)
  //     .json({ status: "fail", message: err.message, name: err.name });

  return res.status(500).json({
    status: "error",
    message: err.message,
    // message: 'Something went wrong!',
  });

  // DEV ERROR
  // console.log(err);
  // return res.status(500).json({
  //   error: err,
  //   message: err.message,
  // });
};

export default appError;
