import { IStudent } from "src/interfaces/student";
import { StudentRepo } from "../repositories/student";
import ErrorResponses from "../error/ErrorResponses";
import { ObjectId } from "mongoose";

// Student Service
export class StudentService extends StudentRepo {
  // Single student data
  async singleStudentData(email: string): Promise<IStudent | null> {
    const studentData = await this.findOne<IStudent>({ email });
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return studentData;
  }

  // Student Room
  async studentRoomById(_id: string): Promise<{ room: string; block: ObjectId }> {
    const studentData = await this.findOne<IStudent>({ _id });
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return { room: studentData.room, block: studentData.block };
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

  // Update single student
  async updateSingleStudent(_id: string, data: any): Promise<IStudent> {
    const updatedData = await this.findByIdAndUpdate(_id, data);
    if (!updatedData) throw ErrorResponses.noDataFound("student");
    return updatedData;
  }
}
