import asyncHandler from "express-async-handler";
import { NoticeService } from "../../services/notice";
import { dataFormattor } from "../../utils/JSON-formattor";
import { ComplaintService } from "../../services/complaint";
import { StudentService } from "../../services/student";
import { BlockService } from "../../services/block";

const noticeService = new NoticeService();
const complaintService = new ComplaintService();
const studentService = new StudentService();
const blockService = new BlockService();

// All notices for staffs
export const notices = asyncHandler(async (req, res) => {
  const staffNotices = await noticeService.staffNotices();
  res.json(dataFormattor(staffNotices));
});

// Statistics for dashboard
export const dashboardStatistics = asyncHandler(async (req, res) => {
  const complaintStatistics = await complaintService.complaintStatisticsByStaff(
    req.tokenPayload?._id!
  );
  const noticesForStaffs = await noticeService.staffNotices();
  const noticeStatistics = {
    title: "Notices",
    count: noticesForStaffs.filter(({ visibility }) => visibility).length,
    total: noticesForStaffs.length,
  };
  const hostelData = await blockService.hostelOccupancy();
  const attendanceStatistics = {
    title: "Attendance",
    count: hostelData?.occupancy,
    total: hostelData?.availableRooms,
  };
  res.json(dataFormattor([attendanceStatistics, complaintStatistics, noticeStatistics]));
});
