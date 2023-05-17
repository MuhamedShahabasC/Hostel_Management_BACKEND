import { Router } from "express";
import {
  allBlocks,
  availableRooms,
  blockData,
  changeRoomAvailability,
  checkRoomAvailability,
  deleteBlock,
  newBlock,
  updateRoom,
} from "../controllers/chiefWarden/block";
import { login, resetPassword } from "../controllers/chiefWarden/auth";
import { validate } from "../middlewares/validateBody";
import {
  mealPlanSchema,
  newBlockSchema,
  noticeSchema,
  staffSchema,
  updateComplaintSchema,
  updateStudentSchema,
} from "../utils/yupSchema";
import {
  changeVisiblity,
  newNotice,
  updateNotice,
  singleNotice,
  deleteNotice,
  allNotices,
  noticeStatistics,
} from "../controllers/chiefWarden/notice";
import { validate_id } from "../middlewares/validateParams";
import {
  allStudentsData,
  allStudentsEmail,
  paymentStatistics,
  updateSingleStudent,
} from "../controllers/chiefWarden/student";
import {
  allMealPlans,
  changeAvailability,
  newMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";
import { checkAuth } from "../middlewares/verifyToken";
import {
  allComplaints,
  complaintsByStaff,
  singleComplaint,
  updateComplaint,
} from "../controllers/chiefWarden/complaint";
import { allStaffsData, newStaff, staffsByDept } from "../controllers/chiefWarden/staff";
import { allChatMessages } from "../controllers/chiefWarden/chat";

// ------- CHIEF WARDEN ROUTES ------- //

const chiefWarden = Router();

// Authentication
chiefWarden.post("/auth", login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
chiefWarden.use(checkAuth("chief-warden"));

// Reset Password
chiefWarden.patch("/auth", resetPassword);

// Chat
chiefWarden.get("/chats/:room", allChatMessages);

// Notices
chiefWarden.get("/notices/all", allNotices);
chiefWarden.get("/notices/statistics", noticeStatistics);
chiefWarden
  .route("/notices/:_id?")
  .get(validate_id, singleNotice)
  .post(validate(noticeSchema), newNotice)
  .put(validate_id, validate(noticeSchema), updateNotice)
  .patch(validate_id, validate(noticeSchema), changeVisiblity)
  .delete(validate_id, deleteNotice);

// Blocks and Rooms
chiefWarden
  .route("/blocks/:_id?")
  .get(allBlocks)
  .post(validate(newBlockSchema), newBlock)
  .patch(validate_id, updateRoom)
  .delete(validate_id, deleteBlock);
chiefWarden.get("/blocks/rooms/availability/:roomCode", checkRoomAvailability);
chiefWarden.get("/blocks/rooms/availableRooms/:_id", availableRooms);
chiefWarden.get("/blocks/name/:name", blockData);

// Meal Plans
chiefWarden
  .route("/mealPlans/:_id?")
  .get(allMealPlans)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeAvailability);

// Complaints
chiefWarden.get("/complaints", allComplaints);
chiefWarden.use("/complaints/:_id", validate_id);
chiefWarden
  .route("/complaints/:_id")
  .get(singleComplaint)
  .patch(validate(updateComplaintSchema), updateComplaint);

// Students
chiefWarden.get("/students/all", allStudentsData);
chiefWarden.get("/students/emails", allStudentsEmail);
chiefWarden.get("/students/paymentStatus", paymentStatistics);
chiefWarden.patch(
  "/students/:_id",
  validate_id,
  validate(updateStudentSchema),
  updateSingleStudent
);

// Staffs
chiefWarden.route("/staffs").get(allStaffsData).post(validate(staffSchema), newStaff);
chiefWarden.get("/staffs/:_id", validate_id, complaintsByStaff);
chiefWarden.get("/staffs/department/:department", staffsByDept);

export default chiefWarden;
