import { CRUD } from "./CRUD";
import { StudentModel } from "../models/student";
import { IStudent } from "../interfaces/student";
import ErrorResponses from "../error/ErrorResponses";
import { AuthRoles, AuthService } from "../services/auth";
import { hashPassword } from "../utils/passwordManager";

// Student Repository
export abstract class StudentRepo extends CRUD {
  // Student model
  model = StudentModel;

  // Add new student
  async createStudent(data: IStudent) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw ErrorResponses.mongoError();
    }
  }

  // Get all student emails
  async allStudentsEmail() {
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
    return aggregatedResult.map(emailObj => emailObj.email);
  }
}

// Student Auth respository
export class StudentAuth extends AuthService {
  // Role
  role: AuthRoles = "student";

  // Find student
  async find<IStudent>(email: string): Promise<IStudent | null> {
    return await StudentModel.findOne({ email });
  }

  // Update password
  async updatePassword(email: string, newPassword: string): Promise<string | null> {
    const hashedPassword = await hashPassword(newPassword);
    await StudentModel.findOneAndUpdate({ email }, { password: hashedPassword });
    return "Password Updated";
  }
}
