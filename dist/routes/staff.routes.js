"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_staff_1 = require("../controllers/staff/crud.staff");
const auth_staff_1 = require("../controllers/staff/auth.staff");
const staff = (0, express_1.Router)();
// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })
staff.route("/").post(auth_staff_1.newStaff).get(auth_staff_1.getAll);
staff.route("/:staff").get(crud_staff_1.singleDetails).patch(crud_staff_1.updateSingleStaff);
staff.route("/auth").post(auth_staff_1.login);
exports.default = staff;
