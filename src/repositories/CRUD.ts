import { Model } from "mongoose";

// Generic CRUD class repository for collections

export abstract class CRUD {
  // Model
  abstract model: Model<any>;

  // create()
  protected async create(data: any) {
    return this.model.create(data);
  }

  // findOne()
  protected async findOne(filter: Object) {
    return this.model.findOne(filter, { __v: 0 });
  }

  // find()
  protected async findAll(filter?: Object, options?: any) {
    return this.model.find({ ...filter }, { ...options, __v: 0 });
  }

  // findByIdAndUpdate()
  protected async idAndUpdate(_id: string, data: any) {
    return this.model.findByIdAndUpdate(_id, data, { runValidators: true });
  }

  // findOneAndUpdate()
  protected async OneAndUpdate(email: string, data: any) {
    return this.model.findOneAndUpdate({ email: email }, data, {
      runValidators: true,
      new: true,
    });
  }

  // findByIdAndDelete()
  protected async idAndDelete(filter: Object) {
    return this.model.findByIdAndDelete(filter);
  }
}
