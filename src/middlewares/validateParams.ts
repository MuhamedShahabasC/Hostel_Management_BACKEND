// import { RequestHandler } from "express";
// import ErrorResponses from "../error/ErrorResponses";
// import validator from "validator";

// // Validate MongoDB ID in Params
// export const validate_id: RequestHandler = (req, res, next) => {
//   const { _id } = req.params;
//   if (!validator.isMongoId(_id)) throw ErrorResponses.badRequest();
//   next();
// };

// // Validate email in params
// export const validate_email: RequestHandler = (req, res, next) => {
//   const { email } = req.params;
//   if (!validator.isEmail(email)) throw ErrorResponses.badRequest();
//   next();
// };
