import { Router } from "express";
import { login, newStudent } from "../controllers/student/auth";
import { validate } from "../middlewares/validateBody";
import { studentAdmissionSchema } from "../middlewares/yupSchema";
import { loginSchema } from "../middlewares/yupSchema";

const student = Router();

// New Admission
student.route("/").post(validate(studentAdmissionSchema), newStudent);

// Auth
student.route("/auth/:email").post(validate(loginSchema), login);

export default student;
