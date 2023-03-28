import { ChiefWardenModel } from "../models/chiefWarden";
import { StaffModel } from "../models/staff";
import ErrorResponses from "../error/ErrorResponses";
import { IChiefWarden } from "../interfaces/IChiefWarden";
import { comparePassword, hashPassword } from "../utils/passwordManager";
import { IMongooseError } from "../interfaces/IMongooseValidation";

// Unified authentication service for everyone

export type AuthRoles = "student" | "staff" | "chief-warden";

export abstract class AuthService {
  abstract role: AuthRoles;
  abstract find(email: string): Promise<IChiefWarden | null>;

  async login(email: string, password: string): Promise<IChiefWarden> {
    const existingUser = await this.find(email.toLowerCase());
    if (!existingUser) {
      throw ErrorResponses.noDataFound(this.role);
    }
    const validPassword = await comparePassword(
      password,
      existingUser.password
    );
    if (!validPassword) {
      throw ErrorResponses.unautharized("Invalid Password");
    }
    return existingUser;
  }

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
      throw ErrorResponses.mongoError(error);
    }
  }
}
