import { StaffModel } from "../models/staff";
import { IStaff } from "../interfaces/staff";
import { AuthRoles, AuthService } from "../services/auth";
import { hashPassword } from "../utils/passwordManager";
import { CRUD } from "./CRUD";

export class StaffAuth extends AuthService {
  // Role of User
  public role: AuthRoles = "staff";
  // Finding single staff
  async find<IStaff>(email: string): Promise<IStaff | null> {
    return await StaffModel.findOne({ email });
  }
}

export class StaffRepo extends CRUD {
  model = StaffModel;

  // Fetching all staffs
  protected async getAll(): Promise<IStaff[]> {
    return await this.findAll({ password: 0 });
  }

  // Get single staff
  protected async single(email: string): Promise<IStaff> {
    return await this.findOne({ email });
  }

  // Update single staff
  protected async update(email: string, data: any): Promise<IStaff> {
    data.password = await hashPassword(data.password);
    return await this.OneAndUpdate(email, data);
  }
}
