import { Router } from "express";
import {
  allStaffs,
  singleStaff,
  updateSingleStaff,
} from "../controllers/staff/crud.staff";
import { newStaff, login } from "../controllers/staff/auth.staff";
import {
  loginSchema,
  mealPlanSchema,
  staffSchema,
} from "../middlewares/yupSchema";
import { validate } from "../middlewares/validateBody";
import { validate_email, validate_id } from "../middlewares/validateParams";
import { validateRole } from "../middlewares/validateRole";
import {
  allMealPlans,
  changeAvailability,
  newMealPlan,
  showActiveMealPlans,
  singleMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";

const staff = Router();


// -- STAFF ROUTES --
staff.route("/").post(validate(staffSchema), newStaff).get(allStaffs);
staff
  .route("/:email")
  .get(validate_email, singleStaff)
  .patch(validate_email, validate(staffSchema), updateSingleStaff);
staff.route("/auth").post(validate(loginSchema), login);


// -- CHEF ROUTES --
// Middleware to validate email and chef role
staff.use("/:email/meals/", validate_email, validateRole("chef"));

staff.route("/:email/meals/all").get(allMealPlans);
staff.route("/:email/meals/activePlans").get(showActiveMealPlans);
staff
  .route("/:email/meals/:_id?")
  .get(validate_id, singleMealPlan)
  .post(validate(mealPlanSchema), newMealPlan)
  .put(validate_id, validate(mealPlanSchema), updateMealPlan)
  .patch(validate_id, changeAvailability);


export default staff;
