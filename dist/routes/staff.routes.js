"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crud_staff_1 = require("../controllers/staff/crud.staff");
const auth_staff_1 = require("../controllers/staff/auth.staff");
const yupSchema_1 = require("../middlewares/yupSchema");
const validateBody_1 = require("../middlewares/validateBody");
const staff = (0, express_1.Router)();
// staff
//   .route("/")
//   .get((req: Request, res: Response) => {
//     res.json("The Staff side of the Hostel Management App 👲");
//   })
staff.route("/").post((0, validateBody_1.validate)(yupSchema_1.staffSchema), auth_staff_1.newStaff).get(auth_staff_1.getAll);
staff
    .route("/:staff")
    .get(crud_staff_1.singleDetails)
    .patch((0, validateBody_1.validate)(yupSchema_1.staffSchema), crud_staff_1.updateSingleStaff);
staff.route("/auth").post((0, validateBody_1.validate)(yupSchema_1.loginSchema), auth_staff_1.login);
exports.default = staff;
