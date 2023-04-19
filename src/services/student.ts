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

  // Get all students data
  async allStudentsData(): Promise<IStudent[] | null> {
    const allStudentsData = await this.findAndPopulate([
      { path: "mealPlan", select: "title" },
      { path: "block", select: "name" },
    ]);
    if (allStudentsData.length < 1) throw ErrorResponses.noDataFound("students");
    return allStudentsData;
  }
}
