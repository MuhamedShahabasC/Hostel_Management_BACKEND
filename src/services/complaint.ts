import ErrorResponses from "../error/ErrorResponses";
import { ComplaintRepo } from "../repositories/complaint";

// Complaint service
export class ComplaintService extends ComplaintRepo {
  // Update complaint
  async updateComplaint(_id: string, data: any) {
    if (
      data.status === "initiated" ||
      data.oldStatus === "rejected" ||
      data.oldStatus === "resolved"
    )
      throw ErrorResponses.customError("Invalid Status");
    await this.findByIdAndUpdate(_id, data);
    return "Complaint Updated";
  }

  // Complaints for single staff
  async complaintsByStaff(_id: string) {
    return await this.allComplaints({ staff: _id });
  }
  
  // Complaints for single student
  async complaintsByStudent(_id: string) {
    return await this.allComplaints({ student: _id });
  }
}
