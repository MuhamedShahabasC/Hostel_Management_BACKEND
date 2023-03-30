import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { NoticeService } from "../../services/notice";

// Notice Service
const service = new NoticeService();

// Get single notice details
export const singleNotice = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const noticeDetails = await service.singleNotice(_id);
  res.json(dataFormattor(noticeDetails));
});

// Post a new notice
export const newNotice = asyncHandler(async (req, res) => {
  await service.newNotice(req.body);
  res.json(dataFormattor(`Notice posted successfully`));
});

// Update a new notice
export const updateNotice = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  await service.updateNotice(_id, req.body);
  res.json(dataFormattor("Notice updated successfully"));
});

// Show / Hide a notice
export const changeVisiblity = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { visibility } = req.body;
  await service.changeVisibility(_id, !visibility);
  res.json(dataFormattor(`Notice is ${!visibility ? "visible" : "hidden"}`));
});

// Delete a notice
export const deleteNotice = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  await service.deleteNotice(_id);
  res.json(dataFormattor("Notice deleted successfully"));
});
