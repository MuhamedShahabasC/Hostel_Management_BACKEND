import { Model } from "mongoose";

// Generic CRUD class repository for collections

export abstract class CRUD {
  abstract model: Model<any>;

  protected async create(data: any) {
    return this.model.create(data);
  }

  protected async idAndUpdate(_id: string, data: any) {
    return this.model.findByIdAndUpdate(_id, data, { runValidators: true });
  }

  protected async findOne(filter: Object) {
    return this.model.findOne(filter, { __v: 0 });
  }

  protected async idAndDelete(filter: Object) {
    return this.model.findByIdAndDelete(filter);
  }
}
