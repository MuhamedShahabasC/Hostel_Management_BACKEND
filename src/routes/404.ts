import { Request, Response, Router } from "express";
import ErrorResponses from "../error/ErrorResponses";
import asyncHandler from "express-async-handler";

const notFound = Router();

// Handling 404 endpoints 
notFound.all(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    throw ErrorResponses.endPointNotFound(req.originalUrl);
  })
);

export default notFound;