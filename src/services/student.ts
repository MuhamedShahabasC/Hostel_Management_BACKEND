import { IStudent, PopulatedStudent } from "src/interfaces/student";
import { StudentRepo } from "../repositories/student";
import ErrorResponses from "../error/ErrorResponses";
import { ObjectId } from "mongoose";

// Student Service
export class StudentService extends StudentRepo {
  // Single student data by _id
  async singleStudentById(_id: string): Promise<PopulatedStudent> {
    const studentData = await this.findAndPopulate("mealPlan", { _id });
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return studentData[0];
  }

  // Student Room
  async studentRoomById(_id: string): Promise<{ room: string; block: ObjectId }> {
    const studentData = await this.findOne<IStudent>({ _id });
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return { room: studentData.room, block: studentData.block };
  }

  // Get all students data
  async allStudentsData(filter: Object = {}): Promise<IStudent[] | null> {
    const allStudentsData = await this.findAndPopulate(
      [
        { path: "mealPlan", select: "title price name" },
        { path: "block", select: "name" },
      ],
      filter
    );
    if (allStudentsData.length < 1) throw ErrorResponses.noDataFound("students");
    return allStudentsData;
  }

  // All resident Students
  async residentStudents(): Promise<IStudent[] | null> {
    return await this.allStudentsData({ status: "resident" });
  }

  // Update single student
  async updateSingleStudent(_id: string, data: object) {
    const updatedData = await this.findByIdAndUpdate<IStudent>(_id, data);
    if (!updatedData) throw ErrorResponses.noDataFound("student");
    return updatedData;
  }

  // Single student data by email
  async singleStudentByEmail(email: string): Promise<IStudent | null> {
    const studentData = await this.findAndPopulate("mealPlan", { email });
    if (!studentData) throw ErrorResponses.noDataFound("Student");
    return studentData[0];
  }

  // Add payment to student
  async addPayment(student: string, amountInPaisa: number): Promise<IStudent> {
    return await this.updateSingleStudent(student, {
      $inc: { paidPayment: amountInPaisa / 100, balancePayment: -(amountInPaisa / 100) },
    });
  }
}
