// Module for managing passwords
// Current: bcrypt

import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (inputPassword: string): Promise<string> => {
  try {
    return await bcrypt.hash(inputPassword, saltRounds);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean | undefined> => {
  try {
    return await bcrypt.compare(inputPassword, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};
