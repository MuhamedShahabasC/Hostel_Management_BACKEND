import { Router } from "express";
import { newStudent } from "../controllers/student/auth";
import { validate } from "../middlewares/validateBody";
import { studentAdmissionSchema } from "../middlewares/yupSchema";

const student = Router();

// New Admission
student.route("/").post(validate(studentAdmissionSchema), newStudent);

export default student;
