import express from "express";
import { newStudent } from "../controllers/student/auth";

const router = express.Router();

// Signup student
router.route("/signUp").post(newStudent);
