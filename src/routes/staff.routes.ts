import { Router } from "express";
import {
  singleDetails,
  updateSingleStaff,
} from "../controllers/staff/crud.staff";
import { newStaff, login, getAll } from "../controllers/staff/auth.staff";

const staff = Router();

// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })

staff.route("/").post(newStaff).get(getAll);

staff.route("/:staff").get(singleDetails).patch(updateSingleStaff);

staff.route("/auth").post(login);

export default staff;
