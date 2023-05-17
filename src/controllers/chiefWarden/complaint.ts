import asyncHandler from "express-async-handler";
import { ComplaintService } from "../../services/complaint";
import { dataFormattor } from "../../utils/JSON-formattor";
import { presetMailTemplates, sendMail } from "../../utils/sendMail";

const service = new ComplaintService();

// Fetch all complaints
export const allComplaints = asyncHandler(async (req, res) => {
  const filterObj = { ...req.query };
  for (const filter in filterObj)
    if (!filterObj[filter] || filter !== "status") delete filterObj[filter];
  const allComplaints = await service.allComplaints(filterObj);
  res.json(dataFormattor(allComplaints));
});

// Fetch single complaint
export const singleComplaint = asyncHandler(async (req, res) => {
  const singleComplaint = await service.getSingleComplaint(req.params._id);
  res.json(dataFormattor(singleComplaint));
});

// Update complaint
export const updateComplaint = asyncHandler(async (req, res) => {
  const updatedComplaint = await service.updateComplaint(req.params._id, req.body);
  const { staff, student } = await service.getSingleComplaint(req.params._id);
  sendMail(
    presetMailTemplates.complaintUpdate(
      student.email,
      req.params._id,
      updatedComplaint.status,
      staff
    )
  );
  res.json(dataFormattor(updatedComplaint));
});

// Complaints by staff
export const complaintsByStaff = asyncHandler(async (req, res) => {
  const complaintsByStaff = await service.complaintStatisticsByStaff(req.params._id);
  res.json(dataFormattor(complaintsByStaff));
});

// Complaints statistics
export const complaintsStatistics = asyncHandler(async (req, res) => {
  const complaintsStatistics = await service.statistics();
  res.json(dataFormattor(complaintsStatistics));
});
