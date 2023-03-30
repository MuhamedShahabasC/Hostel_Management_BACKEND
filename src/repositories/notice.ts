import { NoticeModel } from "../models/notice";
import { CRUD } from "./CRUD";
import { INotice } from "../interfaces/chiefWarden";
import { Model } from "mongoose";

// Notice Repository

export class NoticeRepo extends CRUD {
  model: Model<INotice> = NoticeModel;
  protected async update(_id: string, data: INotice) {
    console.log(data);
    return await this.idAndUpdate(_id, data);
  }

  protected async post(data: INotice) {
    return await this.create(data);
  }

  protected async single(_id: string) {
    return await this.findOne({ _id });
  }

  protected async remove(_id: string) {
    return await this.idAndDelete({ _id });
  }
}
