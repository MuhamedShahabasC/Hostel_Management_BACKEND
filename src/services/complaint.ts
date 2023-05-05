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
}
