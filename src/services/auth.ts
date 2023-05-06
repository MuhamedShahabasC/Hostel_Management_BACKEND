import { ChiefWardenModel } from "../models/chiefWarden";
import { StaffModel } from "../models/staff";
import ErrorResponses from "../error/ErrorResponses";
import { comparePassword, hashPassword } from "../utils/passwordManager";
import { LoginCred } from "../interfaces/auth";
import { StudentModel } from "../models/student";

// Unified authentication service for everyone using Generic functions

export type AuthRoles = "student" | "staff" | "chief-warden";

export abstract class AuthService {
  // Role of the user
  abstract role: AuthRoles;

  // Find method of the corresponding role
  abstract find<T>(email: string): Promise<T | null>;

  // Update Password method for the corresponding role
  abstract updatePassword<T>(email: string, newPassword: string): Promise<null | string>;

  //
  // Generic Login, Signup and reset password methods for all users
  //
  // Login
  async login<T extends LoginCred>(email: string, password: string): Promise<T> {
    const existingUser: T | null = await this.find(email.trim().toLowerCase());
    if (!existingUser) throw ErrorResponses.noDataFound(this.role);
    const validPassword = await comparePassword(password, existingUser.password);
    if (!validPassword) throw ErrorResponses.unauthorized("Invalid Password");
    existingUser.password = "Very encrypted :P";
    return existingUser;
  }

  // Sign Up
  async signUp(data: any): Promise<string | void> {
    let collection;
    switch (this.role) {
      case "chief-warden": {
        collection = ChiefWardenModel;
        break;
      }
      case "staff": {
        collection = StaffModel;
        break;
      }
      case "student": {
        collection = StudentModel;
      }
    }
    if (!collection) throw new Error("Error signing up " + this.role);
    data.password = await hashPassword(data.password);
    const newData = new collection(data);
    await newData.save();
    return `${data.name} signed up successfully`;
  }

  // Reset Password
  async resetPassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Promise<string | null> {
    await this.login(email, currentPassword);
    return await this.updatePassword(email, newPassword);
  }
}
