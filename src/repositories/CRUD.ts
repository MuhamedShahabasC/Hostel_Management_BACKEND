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
  protected async findOne<T>(query: Object, options?: Object): Promise<T | null> {
    return this.model.findOne(query, { __v: 0, password: 0, ...options });
  }

  // findOneAndPopulate()
  protected async findOneAndPopulate(query: Object, populateFields: any, options?: Object) {
    return this.model.findOne(query, { __v: 0, password: 0, ...options }).populate(populateFields);
  }

  // find()
  protected async findAll(filter?: Object, options?: Object): Promise<any | null> {
    return this.model.find({ ...filter }, { ...options, __v: 0, password: 0 }).sort({ _id: -1 });
  }

  // findAndPopulate()
  protected async findAndPopulate(
    populateFields: any,
    filter?: Object,
    options?: Object
  ): Promise<any | null> {
    return this.model
      .find({ ...filter }, { ...options, __v: 0, password: 0 })
      .populate(populateFields)
      .sort({ _id: -1 });
  }

  // findByIdAndUpdate()
  protected async findByIdAndUpdate(_id: string, data: object) {
    return this.model.findByIdAndUpdate(_id, data, { runValidators: true, new: true });
  }

  // findOneAndUpdate()
  protected async findOneAndUpdate(filter: object, data: object) {
    return this.model.findOneAndUpdate(filter, data, {
      runValidators: true,
      new: true,
    });
  }

  // findByIdAndDelete()
  protected async idAndDelete(filter: Object) {
    return this.model.findByIdAndDelete(filter);
  }
}
