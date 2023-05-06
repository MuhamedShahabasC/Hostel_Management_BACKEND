import { Router } from "express";
import {
  allStaffs,
  singleStaff,
  updateProfileImage,
  updateSingleStaff,
} from "../controllers/staff/crud";
import { newStaff, login, resetPassword } from "../controllers/staff/auth";
import {
  loginSchema,
  mealPlanSchema,
  resetPasswordSchema,
  staffSchema,
  updateComplaintByStaff,
  updateProfilePicSchema,
} from "../utils/yupSchema";
import { validate } from "../middlewares/validateBody";
import { validate_id } from "../middlewares/validateParams";
import { validateStaffRole } from "../middlewares/validateStaffDepartment";
import {
  allMealPlans,
  changeAvailability,
  newMealPlan,
  showActiveMealPlans,
  singleMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";
import { checkAuth } from "../middlewares/verifyToken";
import { dashboardStatistics, notices } from "../controllers/staff/staff";
import { complaints, updateComplaint } from "../controllers/staff/complaint";

const staff = Router();

// -- COMMON ROUTES --

// Authentication
staff.route("/auth").post(validate(loginSchema), login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
// staff.use(checkAuth("staff"));

// Reset password
staff.patch("/auth", validate(resetPasswordSchema), resetPassword);

// Single Staff CRUD
staff
  .route("/")
  .get(singleStaff)
  .post(validate(staffSchema), updateSingleStaff)
  .patch(validate(updateProfilePicSchema), updateProfileImage);

// New staff and All staffs => ////// to be moved to chief warden routes ////
staff.route("/new").post(validate(staffSchema), newStaff);
staff.get("/all", allStaffs);

// Dashboard statistics
staff.route("/dashboard").get(dashboardStatistics);

// Notices
staff.get("/notices", notices);

// Complaints
staff
  .route("/complaints/:_id?")
  .get(complaints)
  .patch(validate_id, validate(updateComplaintByStaff), updateComplaint);

// -- CHEF ROUTES --

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION AND CHEF ROLE
staff.use("/meals/", validateStaffRole("chef"));

staff.route("/meals/all").get(allMealPlans);
staff.route("/meals/activePlans").get(showActiveMealPlans);
staff
  .route("/meals/:_id?")
  .get(validate_id, singleMealPlan)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeAvailability);

export default staff;
