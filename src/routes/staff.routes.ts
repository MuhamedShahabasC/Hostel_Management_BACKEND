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
} from "../middlewares/yupSchema";
import { validate } from "../middlewares/validateBody";
import { validate_email, validate_id } from "../middlewares/validateParams";
import { validateStaffRole } from "../middlewares/validateRole";
import {
  allMealPlans,
  changeAvailability,
  newMealPlan,
  showActiveMealPlans,
  singleMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";
import { checkAuth } from "../middlewares/verifyToken";

const staff = Router();

// -- COMMON ROUTES --

// Authentication
staff.route("/auth").post(validate(loginSchema), login);

// MIDDLEWARE TO VERIFY JWT AUTHENTICATION
staff.use(checkAuth("staff"));

// Reset password
staff.patch("/auth", validate_email, validate(resetPasswordSchema), resetPassword);

// Single Staff CRUD
staff
  .route("/")
  .get(singleStaff)
  .post(validate(staffSchema), updateSingleStaff)
  .patch(updateProfileImage);

// New staff and All staffs
staff.route("/new").post(validate(staffSchema), newStaff);
staff.get("/all", allStaffs);

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
