import { AuthService, AuthRoles } from "../services/auth";
import { ChiefWardenModel } from "../models/chiefWarden";
import { IChiefWarden, INotice } from "../interfaces/chiefWarden";
import { IBlock } from "../interfaces/block";
import { BlockModel } from "../models/block";
import { NoticeModel } from "../models/notice";

export class ChiefWardenRepo extends AuthService {
  public role: AuthRoles = "chief-warden";
  async find<IChiefWarden>(email: string): Promise<IChiefWarden | null> {
    return await ChiefWardenModel.findOne({ email });
  }

  // Create a new block
  protected async createBlock(data: IBlock): Promise<IBlock | null> {
    return await BlockModel.create(data);
  }

  // Create a new notice
  protected async createNotice(data: INotice): Promise<INotice | null> {
    return await NoticeModel.create(data);
  }

  // Edit notice
  protected async editNotice(
    _id: string,
    data: INotice
  ): Promise<INotice | null> {
    return await NoticeModel.findOneAndUpdate({ _id }, data);
  }

  // Show or hide notice
}
