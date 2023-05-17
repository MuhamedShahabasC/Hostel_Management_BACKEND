// Module for token handling
// Current: JSON Web Token - JWT

import { sign, JwtPayload, verify } from "jsonwebtoken";
import { TokenDepartment, TokenRole } from "../interfaces/auth";
import { ObjectId } from "mongoose";

// Sign Token
export const signToken = (
  _id: ObjectId,
  email: string,
  role: TokenRole,
  department?: TokenDepartment
): JwtPayload | string => {
  return sign({ _id, email, role, department }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

// Verify token
export const verifyToken = (token: string) => verify(token, process.env.JWT_SECRET as string);
