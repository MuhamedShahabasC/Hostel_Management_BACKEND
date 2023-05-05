import asyncHandler from "express-async-handler";
import { ComplaintService } from "../../services/complaint";
import { dataFormattor } from "../../utils/JSON-formattor";

const service = new ComplaintService();

// Post new complaint
export const newComplaint = asyncHandler(async (req, res) => {
  req.body.student = req.tokenPayload?._id;
  const data = await service.newComplaint(req.body);
  res.json(dataFormattor(data));
});

// All complaints for corresponding student
export const complaints = asyncHandler(async (req, res) => {
  const allComplaints = await service.complaintsByStudent(req.tokenPayload?._id!);
  res.json(dataFormattor(allComplaints));
});