import { StaffModel } from "../models/staff";
import { IStaff } from "../interfaces/IStaff";
import { AuthRoles, AuthService } from "../services/auth";

export class StaffRepo extends AuthService {
  public role: AuthRoles = "staff";
  async find(email: string): Promise<IStaff | null> {
    return await StaffModel.findOne({ email });
  }
}
