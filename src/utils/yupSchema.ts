import { isValidObjectId } from "mongoose";
import * as yup from "yup";

// Login Schema
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required()
    .test("isvalidEmail", "Invalid e-Mail", (arg) => /[a-z0-9]+@[a-z0-9]+.com/i.test(arg)),
  password: yup.string().trim().required().min(8).max(16),
});

// Staff Schema
export const staffSchema = yup.object().shape({
  name: yup.string().required().trim().min(4, "Invalid Name").max(16, "Invalid Name"),
  email: yup
    .string()
    .trim()
    .required()
    .test("isvalidEmail", "Invalid e-Mail", (arg) => /[a-z0-9]+@[a-z0-9]+.com/i.test(arg)),
  password: yup.string().trim().required().min(8).max(16),
  mobile: yup
    .string()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  role: yup.mixed().oneOf(["warden", "chef"]).required(),
  gender: yup.mixed().oneOf(["male", "female"]).required(),
  profilePic: yup.string().trim(),
  address: yup.object().shape({
    building: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
    city: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
    pin: yup.string().required().trim(),
    state: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
    country: yup
      .string()
      .required()
      .trim()
      .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid Address"),
  }),
});

// Reset Password schema
export const resetPasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .trim()
    .required("Required")
    .min(8, "Invalid Password")
    .max(16, "Invalid Password"),
  newPassword: yup
    .string()
    .trim()
    .required("Required")
    .min(8, "Invalid Password")
    .max(16, "Invalid Password"),
  confirmNewPassword: yup
    .string()
    .trim()
    .required("Required")
    .oneOf([yup.ref("newPassword")], "Passwords must match"),
});

// New Block Schema
export const newBlockSchema = yup.object().shape({
  name: yup
    .string()
    .required("Block name is required")
    .trim()
    .min(3, "Invalid Name")
    .matches(/^[a-zA-Z][a-zA-Z ]*$/, "Invalid block name"),
  code: yup
    .string()
    .required("Block code is required")
    .trim()
    .matches(/^[A-Z]$/, "Invalid block code"),
  numberOfRooms: yup
    .number()
    .required("Number of rooms is required")
    .positive()
    .integer()
    .min(5, "Minimum 5 rooms")
    .max(20, "Maximum 20 rooms"),
});

// Notice Schema
export const noticeSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .trim()
    .min(5, "Title must be longer than 5 characters"),
  message: yup
    .string()
    .required("Message is required")
    .trim()
    .min(10, "Message must be longer than 10 characters")
    .max(200, "Message must be shorter than 200 characters"),
  audience: yup.object().shape({
    student: yup.bool().required("Specify audience").oneOf([true, false], "Specify audience"),
    staff: yup.bool().required("Specify audience").oneOf([true, false], "Specify audience"),
  }),
  visibility: yup.bool().oneOf([true, false], "Must be true or false"),
  date: yup.date(),
});

// Meal Plan schema
export const mealPlanSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required.")
    .trim()
    .min(5, "Title must be longer than 5 characters")
    .max(15, "Title must be shorter than 15 characters"),
  price: yup
    .number()
    .required("Price is required")
    .positive()
    .min(1000, "Minimum 1K")
    .max(10000, "Maximum 10K"),
  breakfast: yup
    .string()
    .required("Breakfast is required")
    .trim()
    .min(5, "Breakfast must be longer than 10 characters")
    .max(100, "Breakfast must be shorter than 200 characters"),
  lunch: yup
    .string()
    .required("Lunch is required")
    .trim()
    .min(5, "Lunch must be longer than 10 characters")
    .max(100, "Lunch must be shorter than 200 characters"),
  evening: yup
    .string()
    .required("Evening is required")
    .trim()
    .min(5, "Evening must be longer than 10 characters")
    .max(100, "Evening must be shorter than 200 characters"),
  dinner: yup
    .string()
    .required("Dinner is required")
    .trim()
    .min(5, "Dinner must be longer than 10 characters")
    .max(100, "Dinner must be shorter than 200 characters"),
  active: yup.bool().oneOf([true, false], "Must be true or false"),
  subscribers: yup.number().positive().integer(),
});

// Student Details
export const studentAdmissionSchema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .lowercase()
    .required()
    .test("isvalidEmail", "Invalid e-Mail", (arg) => /[a-z0-9]+@[a-z0-9]+.com/i.test(arg)),
  name: yup
    .string()
    .required()
    .trim()
    .min(4, "Invalid student name")
    .max(20, "Invalid student name"),
  department: yup
    .string()
    .required()
    .oneOf(["science", "humanities", "commerce"], "Invalid department"),
  gender: yup.string().required().oneOf(["female", "male"], "Invalid gender"),
  password: yup
    .string()
    .trim()
    .required("Required")
    .min(8, "Invalid Password")
    .max(16, "Invalid Password"),
  confirmPassword: yup
    .string()
    .trim()
    .required("Required")
    .oneOf([yup.ref("password")], "Passwords must match"),
  mobile: yup
    .string()
    .required()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  guardianName: yup
    .string()
    .required()
    .trim()
    .min(4, "Invalid guardian name")
    .max(16, "Invalid guardian name"),
  guardianMobile: yup
    .string()
    .required()
    .trim()
    .matches(/^[0-9]{10}$/, "Invalid mobile number"),
  address: yup.object().shape({
    building: yup.string().required().trim().min(4, "Invalid building").max(16, "Invalid building"),
    city: yup.string().required().trim().min(4, "Invalid city").max(16, "Invalid city"),
    pin: yup
      .string()
      .trim()
      .required()
      .matches(/^[0-9]{6}$/, "Invalid Pin Code"),
    state: yup.string().required().trim().min(4, "Invalid state").max(16, "Invalid state"),
    country: yup.string().required().trim().min(4, "Invalid country").max(16, "Invalid country"),
  }),
  bloodGroup: yup
    .string()
    .required()
    .oneOf(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Invalid Blood Group"),
  remarks: yup
    .string()
    .trim()
    .min(4, "Remarks must be longer than 4 characters")
    .max(250, "Remarks must be shorter than 250 characters"),
  room: yup.string().trim().required("Room is required").max(3, "Invalid room code"),
  mealPlan: yup
    .string()
    .trim()
    .required()
    .test("Valid MongoDB _id", "Invalid Room", (arg) => isValidObjectId(arg!)),
  block: yup
    .string()
    .trim()
    .required()
    .test("Valid MongoDB _id", "Invalid Room", (arg) => isValidObjectId(arg!)),
});

// Update student data
export const updateStudentSchema = yup.object().shape({
  room: yup
    .string()
    .required("Room is required")
    .trim()
    .test("roomCode", "Must be exactly 3 characters", (roomCode) => roomCode.length === 3),
  oldRoom: yup
    .string()
    .required("Room is required")
    .trim()
    .test("roomCode", "Must be exactly 3 characters", (roomCode) => roomCode.length === 3),
  status: yup
    .string()
    .trim()
    .required("Student status is required")
    .oneOf(["resident", "rejected", "departed"], "Invalid student status"),
  oldStatus: yup
    .string()
    .trim()
    .required("Student status is required")
    .oneOf(["pending", "resident"], "Invalid student status"),
  student: yup.object().shape({
    name: yup
      .string()
      .required("Student name is required")
      .trim()
      .min(4, "Invalid student name")
      .max(20, "Invalid student name"),
    email: yup
      .string()
      .required("Student email is required")
      .trim()
      .test("isvalidEmail", "Invalid e-Mail", (arg) => /[a-z0-9]+@[a-z0-9]+.com/i.test(arg)),
  }),
});

// Update profile Image
export const updateProfilePicSchema = yup.object().shape({
  profilePic: yup.string().required("Image is required").trim(),
});
