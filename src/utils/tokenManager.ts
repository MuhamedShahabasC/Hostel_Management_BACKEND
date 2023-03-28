// Module for token handling
// Current: JSON Web Token - JWT

import { sign, JwtPayload } from "jsonwebtoken";

export const signToken = (password: string): JwtPayload | string => {
  return sign({password}, process.env.JWT_SECRET as string, { expiresIn: "1d" });
};
