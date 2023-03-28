import { StaffModel } from "../models/staff";
import { IStaff } from "../interfaces/IStaff";
import { AuthRoles, AuthService } from "../services/auth";

export class StaffRepo extends AuthService {
  // Role of User
  public role: AuthRoles = "staff";

  // Finding single staff
  async find<IStaff>(email: string): Promise<IStaff | null> {
    return await StaffModel.findOne({ email });
  }

  // Fetching all staffs
  async getAll() {
    return await StaffModel.find({}, { password: 0, __v: 0 });
  }
}
