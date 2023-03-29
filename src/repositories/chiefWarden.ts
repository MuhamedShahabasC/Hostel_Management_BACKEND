import { AuthService, AuthRoles } from "../services/auth";
import { ChiefWardenModel } from "../models/chiefWarden";
import { IChiefWarden } from "../interfaces/chiefWarden";
import { IBlock } from "../interfaces/block";
import { BlockModel } from "../models/block";

export class ChiefWardenRepo extends AuthService {
  public role: AuthRoles = "chief-warden";
  async find<IChiefWarden>(email: string): Promise<IChiefWarden | null> {
    return await ChiefWardenModel.findOne({ email });
  }

  // Create a new block
  protected async createBlock(data: IBlock): Promise<IBlock | null> {
    return await BlockModel.create(data);
  }
}
