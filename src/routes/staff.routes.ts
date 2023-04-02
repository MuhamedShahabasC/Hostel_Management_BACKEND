import { Router } from "express";
import {
  allStaffs,
  singleDetails,
  updateSingleStaff,
} from "../controllers/staff/crud.staff";
import { newStaff, login } from "../controllers/staff/auth.staff";
import { loginSchema, staffSchema } from "../middlewares/yupSchema";
import { validate } from "../middlewares/validateBody";
import { validate_email } from "../middlewares/validateParams";

const staff = Router();

// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })

staff.route("/").post(validate(staffSchema), newStaff).get(allStaffs);

staff
  .route("/:email")
  .get(validate_email, singleDetails)
  .patch(validate_email, validate(staffSchema), updateSingleStaff);

staff.route("/auth").post(validate(loginSchema), login);

// Chef routes
staff.route('/chef/:_id?').post()
export default staff;
