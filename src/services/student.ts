import { IStudent } from "src/interfaces/student";
import { StudentRepo } from "../repositories/student";
import ErrorResponses from "../error/ErrorResponses";

// Student Service
export class StudentService extends StudentRepo {
  // Single student data
  async singleStudentData(email: string): Promise<IStudent | null> {
    const studentData = await this.findOne<IStudent>({ email });
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return studentData;
  }
}
