import { Router } from "express";
import {
  singleDetails,
  updateSingleStaff,
} from "../controllers/staff/crud.staff";
import { newStaff, login, getAll } from "../controllers/staff/auth.staff";
import { validateLogin, validateStaff } from "../middlewares/validateBody";

const staff = Router();

// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })

staff.route("/").post(validateStaff, newStaff).get(getAll);

staff
  .route("/:staff")
  .get(singleDetails)
  .patch(validateStaff, updateSingleStaff);

staff.route("/auth").post(validateLogin, login);

export default staff;
