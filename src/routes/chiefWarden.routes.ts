import { Router } from "express";
import { allBlocks, deleteBlock, newBlock, updateRoom } from "../controllers/chiefWarden/block";
import { login, resetPassword } from "../controllers/chiefWarden/auth";
import { validate } from "../middlewares/validateBody";
import { mealPlanSchema, newBlockSchema, noticeSchema } from "../middlewares/yupSchema";
import {
  changeVisiblity,
  newNotice,
  updateNotice,
  singleNotice,
  deleteNotice,
  allNotices,
} from "../controllers/chiefWarden/notice";
import { validate_email, validate_id } from "../middlewares/validateParams";
import { allStudentsData } from "../controllers/chiefWarden/student";
import {
  allMealPlans,
  changeAvailability,
  newMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";
import { checkAuth } from "../middlewares/verifyToken";

const chiefWarden = Router();

// Authentication
chiefWarden.post("/login", login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
chiefWarden.use("*", checkAuth("chief-warden"));

// Reset Password
chiefWarden.patch("/auth", resetPassword);

// Blocks and Rooms
chiefWarden
  .route("/blocks/:_id?")
  .get(allBlocks)
  .post(validate(newBlockSchema), newBlock)
  .patch(validate_id, updateRoom) // PENDING WORK
  .delete(validate_id, deleteBlock); // soft

// Meal Plans
chiefWarden
  .route("/mealPlans/:_id?")
  .get(allMealPlans)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeAvailability); // approve

// Notices
chiefWarden.get("/notices/all", allNotices);
chiefWarden
  .route("/notices/:_id?")
  .get(validate_id, singleNotice)
  .post(validate(noticeSchema), newNotice)
  .put(validate_id, validate(noticeSchema), updateNotice)
  .patch(validate_id, validate(noticeSchema), changeVisiblity)
  .delete(validate_id, deleteNotice);

// Students
chiefWarden.route("/students/:email?").get(allStudentsData);

export default chiefWarden;
