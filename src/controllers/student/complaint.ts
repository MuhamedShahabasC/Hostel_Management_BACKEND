import asyncHandler from "express-async-handler";
import { ComplaintService } from "../../services/complaint";
import { dataFormattor } from "../../utils/JSON-formattor";
import { presetMailTemplates, sendMail } from "../../utils/sendMail";

const service = new ComplaintService();

// Post new complaint
export const newComplaint = asyncHandler(async (req, res) => {
  req.body.student = req.tokenPayload?._id;
  const data = await service.newComplaint(req.body);
  sendMail(presetMailTemplates.newComplaint(req.tokenPayload?.email!, data._id));
  res.json(dataFormattor("Complaint filed successfully"));
});

// All complaints for corresponding student with filtering
export const complaints = asyncHandler(async (req, res) => {
  const filterObj = { ...req.query };
  for (const filter in filterObj)
    if (!filterObj[filter] || filter !== "status") delete filterObj[filter];
  const allComplaints = await service.complaintsByStudent(req.tokenPayload?._id!, filterObj);
  res.json(dataFormattor(allComplaints));
});
