import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { NoticeService } from "../../services/notice";

// Notice Service
const service = new NoticeService();

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
  await service.newNotice(req.body);
  res.json(dataFormattor(`Notice posted successfully`));
});

// Update a new notice
export const updateNotice = asyncHandler(async (req, res) => {
  await service.updateNotice(req.params._id, req.body);
  res.json(dataFormattor("Notice updated successfully"));
});

// Show / Hide a notice
export const changeVisiblity = asyncHandler(async (req, res) => {
  const { visibility } = req.body;
  await service.changeVisibility(req.params._id, !visibility);
  //
  //
  //
  //
  res.json(dataFormattor(`Notice is ${!visibility ? "visible" : "hidden"}`));
  //
  //
  //
  //
});

// Delete a notice
export const deleteNotice = asyncHandler(async (req, res) => {
  await service.deleteNotice(req.params._id);
  res.json(dataFormattor("Notice deleted successfully"));
});
