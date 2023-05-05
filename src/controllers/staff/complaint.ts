import asyncHandler from "express-async-handler";
import { ComplaintService } from "../../services/complaint";
import { dataFormattor } from "../../utils/JSON-formattor";

// Complaint service
const service = new ComplaintService();

// Complaints for corresponding staff
export const complaints = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const complaints = await service.complaintsByStaff(
    req.tokenPayload?._id!,
    status && {
      status: status,
    }
  );
  res.json(dataFormattor(complaints));
});

// Update remarks of complaint and status to 'approval'
export const updateComplaint = asyncHandler(async (req, res) => {
  console.log(req.body, req.params);
  const updateComplaint = await service.updateComplaint(req.params._id, req.body);
  res.json(dataFormattor(updateComplaint));
});
