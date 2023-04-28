import asyncHandler from "express-async-handler";
import { NoticeService } from "../../services/notice";
import { dataFormattor } from "../../utils/JSON-formattor";

const noticeService = new NoticeService();

// All notices for staffs
export const notices = asyncHandler(async (req, res) => {
  const staffNotices = await noticeService.staffNotices();
  res.json(dataFormattor(staffNotices));
});
