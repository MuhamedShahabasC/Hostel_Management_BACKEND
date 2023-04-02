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
  changeAvailability,
  newMealPlan,
  singleMealPlan,
  updateMealPlan,
} from "../controllers/staff/chef";

const staff = Router();

staff.route("/").post(validate(staffSchema), newStaff).get(allStaffs);

staff
  .route("/:email")
  .get(validate_email, singleStaff)
  .patch(validate_email, validate(staffSchema), updateSingleStaff);

staff.route("/auth").post(validate(loginSchema), login);

// Chef routes
staff
  .route("/:email/meals/:_id?")
  .get(validate_id, singleMealPlan)
  .post(validateRole("chef"), validate(mealPlanSchema), newMealPlan)
  .put(
    validateRole("chef"),
    validate_id,
    validate(mealPlanSchema),
    updateMealPlan
  )
  .patch(validateRole("chef"), validate_id, changeAvailability);

export default staff;
