import { ChiefWardenModel } from "../models/chiefWarden";
import { StaffModel } from "../models/staff";
import ErrorResponses from "../error/ErrorResponses";
import { comparePassword, hashPassword } from "../utils/passwordManager";
import { LoginCred } from "../interfaces/auth";

// Unified authentication service for everyone using Generic functions

export type AuthRoles = "student" | "staff" | "chief-warden";

export abstract class AuthService {
  abstract role: AuthRoles;
  abstract find<T>(email: string): Promise<T | null>;
  abstract updatePassword<T>(
    email: string,
    newPassword: string
  ): Promise<null | string>;

  // Generic Login Function for all
  async login<T extends LoginCred>(
    email: string,
    password: string
  ): Promise<T> {
    const existingUser: T | null = await this.find(email.trim().toLowerCase());
    if (!existingUser) {
      throw ErrorResponses.noDataFound(this.role);
    }
    const validPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!validPassword) {
      throw ErrorResponses.unauthorized("Invalid Password");
    }
    return existingUser;
  }

  // Generic Sign Up for all
  async signUp(data: any, role: AuthRoles): Promise<Error | void> {
    try {
      let collection;
      switch (role) {
        case "chief-warden": {
          collection = ChiefWardenModel;
          break;
        }
        case "staff": {
          collection = StaffModel;
          break;
        }
      }
      if (!collection) throw new Error("Error signin up " + role);
      data.password = await hashPassword(data.password);
      const newData = new collection(data);
      await newData.save();
    } catch (error) {
      throw ErrorResponses.mongoError();
    }
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
