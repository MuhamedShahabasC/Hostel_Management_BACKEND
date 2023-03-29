import { StaffModel } from "../models/staff";
import { IStaff } from "../interfaces/staff";
import { AuthRoles, AuthService } from "../services/auth";
import { hashPassword } from "../utils/passwordManager";

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

  // Update single staff
  async updateStaff(data: any): Promise<IStaff | null> {
    data.password = await hashPassword(data.password);
    return await StaffModel.findOneAndUpdate({ email: data.email }, data, {
      runValidators: true,
      new: true,
    });
  }
}
