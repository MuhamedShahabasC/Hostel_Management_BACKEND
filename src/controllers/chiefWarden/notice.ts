import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { NoticeService } from "../../services/notice";
import { presetMailTemplates, sendMail } from "../../utils/sendMail";
import { StudentService } from "../../services/student";
import { StaffService } from "../../services/staff";

// Notice Service
const service = new NoticeService();
const studentService = new StudentService();
const staffService = new StaffService();

// Get all notices
export const allNotices = asyncHandler(async (req, res) => {
  const allNotices = await service.allNotices();
  res.json(dataFormattor(allNotices));
});

// Get single notice details
export const singleNotice = asyncHandler(async (req, res) => {
  const noticeDetails = await service.singleNotice(req.params._id);
  res.json(dataFormattor(noticeDetails));
});

// Post a new notice
export const newNotice = asyncHandler(async (req, res) => {
  const { visibility, audience } = req.body;
  await service.newNotice(req.body);
  if (visibility) {
    let email: string[] = [];
    if (audience.staff) {
      const studentEmails = await studentService.allStudentsEmail();
      email = email.concat(studentEmails);
    }
    if (audience.student) {
      const staffEmails = await staffService.allStaffsEmail();
      email = email.concat(staffEmails);
    }
    sendMail(presetMailTemplates.newNotice(email.toString(), req.body.title, req.body.message));
  }
  res.json(dataFormattor(`Notice posted successfully`));
});

// Update a notice
export const updateNotice = asyncHandler(async (req, res) => {
  await service.updateNotice(req.params._id, req.body);
  const { visibility, audience } = req.body;
  if (visibility) {
    let email: string[] = [];
    if (audience.staff) {
      const studentEmails = await studentService.allStudentsEmail();
      email = email.concat(studentEmails);
    }
    if (audience.student) {
      const staffEmails = await staffService.allStaffsEmail();
      email = email.concat(staffEmails);
    }
    sendMail(presetMailTemplates.newNotice(email.toString(), req.body.title, req.body.message));
  }
  res.json(dataFormattor("Notice updated successfully"));
});

// Show / Hide a notice
export const changeVisiblity = asyncHandler(async (req, res) => {
  await service.changeVisibility(req.params._id, !req.body.visibility);
  const { audience } = req.body;
  if (!req.body.visibility) {
    let email: string[] = [];
    if (audience.staff) {
      const studentEmails = await studentService.allStudentsEmail();
      email = email.concat(studentEmails);
    }
    if (audience.student) {
      const staffEmails = await staffService.allStaffsEmail();
      email = email.concat(staffEmails);
    }
    sendMail(presetMailTemplates.newNotice(email.toString(), req.body.title, req.body.message));
  }
  res.json(dataFormattor(`Notice is ${!req.body.visibility ? "visible" : "hidden"}`));
});

// Delete a notice
export const deleteNotice = asyncHandler(async (req, res) => {
  await service.deleteNotice(req.params._id);
  res.json(dataFormattor("Notice deleted successfully"));
});

// Show data of notices for chief warden dashboard
export const noticeStatistics = asyncHandler(async (req, res) => {
  const allNotices = await service.allNotices();
  const activeNotices = await service.activeNotices();
  res.json(dataFormattor([activeNotices.length, allNotices.length]));
});
