import { Router } from "express";
import {
  allBlocks,
  availableRooms,
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
  singleComplaint,
  updateComplaint,
} from "../controllers/chiefWarden/complaint";
import { staffsByDept } from "../controllers/chiefWarden/staff";

const chiefWarden = Router();

// Authentication
chiefWarden.post("/auth", login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
chiefWarden.use(checkAuth("chief-warden"));

// Reset Password
chiefWarden.patch("/auth", resetPassword);

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

// Complaints
chiefWarden.get("/complaints", allComplaints);
chiefWarden.use("/complaints/:_id", validate_id);
chiefWarden
  .route("/complaints/:_id")
  .get(singleComplaint)
  .patch(validate(updateComplaintSchema), updateComplaint);

// Blocks and Rooms
chiefWarden
  .route("/blocks/:_id?")
  .get(allBlocks)
  // not yet on frontend
  .post(validate(newBlockSchema), newBlock)
  .patch(validate_id, updateRoom) // PENDING WORK
  .delete(validate_id, deleteBlock); // soft
chiefWarden.get("/blocks/rooms/availability/:roomCode", checkRoomAvailability);
chiefWarden.get("/blocks/rooms/availableRooms/:_id", availableRooms);

// Meal Plans
chiefWarden
  .route("/mealPlans/:_id?")
  .get(allMealPlans)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeAvailability); // approve

// Students
chiefWarden.get("/students/all", allStudentsData);
chiefWarden.get("/students/emails", allStudentsEmail);
chiefWarden.patch(
  "/students/:_id",
  validate_id,
  validate(updateStudentSchema),
  updateSingleStudent
);

// Staffs
chiefWarden.get("/staffs/department/:department", staffsByDept);

export default chiefWarden;
