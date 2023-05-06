import { NoticeModel } from "../models/notice";
import { CRUD } from "./CRUD";
import { INotice } from "../interfaces/chiefWarden";
import { Model } from "mongoose";

// Notice Repository

export abstract class NoticeRepo extends CRUD {
  // Notice Model
  model: Model<INotice> = NoticeModel;

  // All notices
  protected async findAllNotices(query?: object): Promise<INotice[] | []> {
    return await this.findAll(query);
  }

  // New notice
  protected async post(data: INotice) {
    return await this.create(data);
  }

  // Get single notice
  protected async single(_id: string) {
    return await this.findOne({ _id });
  }

  // Update notice
  protected async update(_id: string, data: INotice) {
    return await this.findByIdAndUpdate(_id, data);
  }

  // Delete a notice
  protected async remove(_id: string) {
    return await this.findByIdAndDelete<INotice>({ _id });
  }
}
