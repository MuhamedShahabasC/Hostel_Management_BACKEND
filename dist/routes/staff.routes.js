"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_staff_1 = require("../controllers/staff/crud.staff");
const auth_staff_1 = require("../controllers/staff/auth.staff");
const validateBody_1 = require("../middlewares/validateBody");
const staff = (0, express_1.Router)();
// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })
staff.route("/").post(validateBody_1.validateStaff, auth_staff_1.newStaff).get(auth_staff_1.getAll);
staff
    .route("/:staff")
    .get(crud_staff_1.singleDetails)
    .patch(validateBody_1.validateStaff, crud_staff_1.updateSingleStaff);
staff.route("/auth").post(validateBody_1.validateLogin, auth_staff_1.login);
exports.default = staff;
