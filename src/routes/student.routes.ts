import { Router } from "express";
import { login, newStudent, resetPassword } from "../controllers/student/auth";
import { validate } from "../middlewares/validateBody";
import { resetPasswordSchema, studentAdmissionSchema } from "../middlewares/yupSchema";
import { loginSchema } from "../middlewares/yupSchema";
import { singleStudent } from "../controllers/student/crud";
import { checkAuth } from "../middlewares/verifyToken";

const student = Router();

// New Admission
student.route("/newAdmission").post(validate(studentAdmissionSchema), newStudent);

// Authentication
student.route("/auth").post(validate(loginSchema), login);

// MIDDLEWARE TO VERIFY JWT TOKEN AUTHENTICATION
student.use(checkAuth("student"));

// Reset Password
student.patch("/auth", validate(resetPasswordSchema), resetPassword);

// Student CRUD
student.route("/").get(singleStudent);

export default student;
