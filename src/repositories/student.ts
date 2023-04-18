import { CRUD } from "./CRUD";
import { StudentModel } from "../models/student";
import { IStudent } from "../interfaces/student";
import ErrorResponses from "../error/ErrorResponses";

// Student Repository
export class StudentRepo extends CRUD {
  model = StudentModel;

  // Add new student
  async createStudent(data: IStudent) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw ErrorResponses.mongoError();
    }
  }
}
