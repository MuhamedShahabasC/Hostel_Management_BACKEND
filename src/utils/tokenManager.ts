// Module for token handling
// Current: JSON Web Token - JWT

import { sign, JwtPayload, verify } from "jsonwebtoken";
import { TokenRole } from "../interfaces/auth";
import { ObjectId } from "mongoose";

export const signToken = (_id: ObjectId, role: TokenRole): JwtPayload | string => {
  return sign({ _id, role }, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};

export const verifyToken = (token: string) => {
  return verify(token, process.env.JWT_SECRET as string);
};
