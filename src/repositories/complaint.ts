import { Model } from "mongoose";
import { CRUD } from "./CRUD";
import { IComplaint, IComplaintInput } from "../interfaces/complaint";
import { ComplaintModel } from "../models/complaint";
import ErrorResponses from "../error/ErrorResponses";

// Complaint repository
export class ComplaintRepo extends CRUD {
  model: Model<IComplaint> = ComplaintModel;

  // New complaint
  async createComplaint(data: IComplaintInput) {
    return await this.create(data);
  }

  // All complaints
  async allComplaints(filter: object = {}): Promise<IComplaint[]> {
    const allComplaints = await this.findAndPopulate(
      [
        {
          select: "name _id email",
          path: "student",
        },
        {
          select: "name _id email",
          path: "staff",
        },
      ],
      filter
    );
    if (allComplaints.length === 0) throw ErrorResponses.noDataFound("complaints");
    return allComplaints;
  }

}
