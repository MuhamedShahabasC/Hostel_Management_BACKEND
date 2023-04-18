import { IStudent } from "../interfaces/student";
import { StudentRepo } from "../repositories/student";

// Student Service
export class StudentService extends StudentRepo {
  // New admission
  async newAdmission(studentData: IStudent): Promise<string> {
    const existingUser = await this.findOne({ email: studentData.email });
    if (existingUser) return "Already existing student";
    await this.createStudent(studentData);
    return "Admission submitted successfully";
  }
}
