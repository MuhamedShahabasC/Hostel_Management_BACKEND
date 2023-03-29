import { Router } from "express";
import {
  singleDetails,
  updateSingleStaff,
} from "../controllers/staff/crud.staff";
import { newStaff, login, getAll } from "../controllers/staff/auth.staff";
import { loginSchema, staffSchema } from "../middlewares/yupSchema";
import { validate } from "../middlewares/validateBody";

const staff = Router();

// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })

staff.route("/").post(validate(staffSchema), newStaff).get(getAll);

staff
  .route("/:staff")
  .get(singleDetails)
  .patch(validate(staffSchema), updateSingleStaff);

staff.route("/auth").post(validate(loginSchema), login);

export default staff;
