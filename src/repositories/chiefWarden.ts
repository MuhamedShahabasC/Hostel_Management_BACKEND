import { AuthService, AuthRoles } from "../services/auth";
import { ChiefWardenModel } from "../models/chiefWarden";
import { IChiefWarden } from "../interfaces/chiefWarden";
import { hashPassword } from "../utils/passwordManager";

export class ChiefWardenRepo extends AuthService {
  public role: AuthRoles = "chief-warden";
  async find<IChiefWarden>(email: string): Promise<IChiefWarden | null> {
    return await ChiefWardenModel.findOne({ email });
  }
  async updatePassword<IChiefWarden>(
    email: string,
    newPassword: string
  ): Promise<string | null> {
    const hashedPassword = hashPassword(newPassword);
    await ChiefWardenModel.findOneAndUpdate(
      { email },
      {
        password: hashedPassword,
      }
    );
    return "Password Updated.";
  }
}
