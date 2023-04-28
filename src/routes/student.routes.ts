import { Router } from "express";
import { login, newStudent, resetPassword } from "../controllers/student/auth";
import { validate } from "../middlewares/validateBody";
import { resetPasswordSchema, studentAdmissionSchema } from "../utils/yupSchema";
import { loginSchema } from "../utils/yupSchema";
import { availableMealPlans, mealPlan, notices, singleStudent, updateProfileImage, updateStudentData } from "../controllers/student/student";
import { checkAuth } from "../middlewares/verifyToken";
import { showActiveMealPlans } from "../controllers/staff/chef";

const student = Router();

// New Admission
student.route("/newAdmisison/mealPlans").get(showActiveMealPlans);
student.route("/newAdmission").post(validate(studentAdmissionSchema), newStudent);

// Login
student.route("/auth").post(validate(loginSchema), login);

// MIDDLEWARE TO VERIFY JWT TOKEN AUTHENTICATION
student.use(checkAuth("student"));

// Reset Password
student.patch("/auth", validate(resetPasswordSchema), resetPassword);

// Student CRUD
student.route("/").get(singleStudent).patch(updateProfileImage).post(updateStudentData);
student.route("/mealPlan").get(mealPlan);

// Notices
student.route("/notices").get(notices);

// Meal plans
student.route("/mealPlans").get(availableMealPlans);

export default student;
