import { Router } from "express";
import { login, newStudent, resetPassword } from "../controllers/student/auth";
import { validate } from "../middlewares/validateBody";
import {
  newComplaintSchema,
  newPaymentSchema,
  resetPasswordSchema,
  studentAdmissionSchema,
  successfulPaymentSchema,
} from "../utils/yupSchema";
import { loginSchema } from "../utils/yupSchema";
import {
  availableMealPlans,
  mealPlan,
  notices,
  singleStudent,
  updateProfileImage,
  updateStudentData,
} from "../controllers/student/student";
import { checkAuth } from "../middlewares/verifyToken";
import { showActiveMealPlans } from "../controllers/staff/chef";
import { allBlocks } from "../controllers/chiefWarden/block";
import { complaints, newComplaint } from "../controllers/student/complaint";
import { allPayments, initiatePayment, successfulPayment } from "../controllers/student/payment";
import { allChatMessages } from "../controllers/student/chat";

const student = Router();

// New Admission
student.route("/newAdmission/mealPlans").get(showActiveMealPlans);
student.route("/newAdmission/blocks").get(allBlocks);
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

// Complaints
student.route("/complaints").get(complaints).post(validate(newComplaintSchema), newComplaint);

// Notices
student.route("/notices").get(notices);

// Meal plans
student.route("/mealPlans").get(availableMealPlans);

// Chat
student.route("/chats").get(allChatMessages);

// Payments
student
  .route("/payments")
  .get(allPayments)
  .patch(validate(newPaymentSchema), initiatePayment)
  .post(validate(successfulPaymentSchema), successfulPayment);

export default student;
