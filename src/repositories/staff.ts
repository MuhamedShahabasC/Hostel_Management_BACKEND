import { StaffModel } from "../models/staff";
import { IStaff } from "../interfaces/staff";
import { AuthRoles, AuthService } from "../services/auth";
import { hashPassword } from "../utils/passwordManager";
import { CRUD } from "./CRUD";
import ErrorResponses from "../error/ErrorResponses";

export class StaffAuth extends AuthService {
  // Role of User
  public role: AuthRoles = "staff";
  // Finding single staff
  async find<IStaff>(email: string): Promise<IStaff | null> {
    return await StaffModel.findOne({ email });
  }
  // Updating Password
  async updatePassword<IStaff>(email: string, newPassword: string): Promise<string | null> {
    const hashedPassword = await hashPassword(newPassword);
    await StaffModel.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );
    return "Password Updated.";
  }
}

export abstract class StaffRepo extends CRUD {
  // Staff Model
  model = StaffModel;

  // Fetching all staffs
  protected async getAll(): Promise<IStaff[]> {
    return await this.findAll();
  }

  // Get single staff
  protected async single(email: string): Promise<IStaff | null> {
    return await this.findOne({ email });
  }

  // Update single staff
  protected async update(email: string, data: any) {
    if (data.password) data.password = await hashPassword(data.password);
    const updatedStaff = await this.findOneAndUpdate<IStaff>({ email }, data);
    if (!updatedStaff) throw ErrorResponses.noDataFound("staff");
    return updatedStaff;
  }

  // Get all staff emails
  async allStaffsEmail(): Promise<string[]> {
    const aggregatedResult = await this.model.aggregate([
      {
        $match: {},
      },
      {
        $project: {
          email: 1,
          _id: 0,
        },
      },
    ]);
    return aggregatedResult.map((emailObj) => emailObj.email);
  }
}
