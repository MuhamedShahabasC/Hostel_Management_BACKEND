import { Request, Response, Router } from "express";
import { newStaff } from "../controllers/staff/index.staff";

const staff = Router();

// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })

staff.route("/").post(newStaff).get(/*GET ALL STAFFS*/);

staff.route("/:staffId").put(/* UPDATE STAFF*/).get(/*SINGLE STAFF*/);

staff.route("/auth").post(/* LOGIN*/);

export default staff;
