import { IComplaint, IComplaintInput, IComplaintPopulated } from "src/interfaces/complaint";
import ErrorResponses from "../error/ErrorResponses";
import { ComplaintRepo } from "../repositories/complaint";

// Complaint service
export class ComplaintService extends ComplaintRepo {
  // New complaint
  async newComplaint(data: IComplaintInput) {
    return await this.createComplaint(data);
  }

  // Update complaint
  async updateComplaint(_id: string, data: any) {
    if (
      data.status === "initiated" ||
      data.oldStatus === "rejected" ||
      data.oldStatus === "resolved"
    )
      throw ErrorResponses.customError("Invalid Status");
    const updatedComplaint = await this.findByIdAndUpdate<IComplaint>(_id, data);
    if (!updatedComplaint) throw ErrorResponses.noDataFound("complaint");
    return updatedComplaint;
  }

  // Complaints for single staff
  async complaintsByStaff(_id: string, filter?: Object) {
    return await this.allComplaints({ staff: _id, ...filter });
  }

  // Complaint statistics of single staff
  async complaintStatisticsByStaff(staff: string) {
    try {
      const allComplaints = await this.allComplaints({ staff });
      const resolvedComplaints = allComplaints?.filter(
        ({ status }) => status === "resolved"
      ).length;
      return {
        title: "Complaints",
        count: resolvedComplaints,
        total: allComplaints.length,
      };
    } catch (error) {
      return {
        title: "Complaints",
        count: 0,
        total: 0,
      };
    }
  }

  // Complaints for single student
  async complaintsByStudent(_id: string, status: object = {}) {
    return await this.allComplaints({ student: _id, ...status });
  }

  // Single complaint
  async getSingleComplaint(_id: string): Promise<IComplaintPopulated> {
    const singleComplaint = await this.findOneAndPopulate({ _id }, [
      { path: "student", select: "email" },
      { path: "staff", select: "email name" },
    ]);
    if (!singleComplaint) throw ErrorResponses.noDataFound("complaint");
    return singleComplaint;
  }

  // Complaints statistics for chief warden
  async statistics() {
    try {
      const allComplaints = await this.allComplaints();
      const resolvedComplaints = allComplaints?.filter(
        ({ status }) => status === "resolved"
      ).length;
      return {
        title: "Complaints",
        count: resolvedComplaints,
        total: allComplaints.length,
      };
    } catch (error) {
      return {
        title: "Complaints",
        count: 0,
        total: 0,
      };
    }
  }
}
