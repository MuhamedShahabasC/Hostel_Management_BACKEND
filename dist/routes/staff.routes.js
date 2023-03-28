"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_staff_1 = require("../controllers/staff/index.staff");
const staff = (0, express_1.Router)();
// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })
staff.route("/").post(index_staff_1.newStaff).get( /*GET ALL STAFFS*/);
staff.route("/:staffId").put( /* UPDATE STAFF*/).get( /*SINGLE STAFF*/);
staff.route("/auth").post( /* LOGIN*/);
exports.default = staff;
