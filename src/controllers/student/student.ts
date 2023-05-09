import asyncHandler from "express-async-handler";
import { StudentService } from "../../services/student";
import { dataFormattor } from "../../utils/JSON-formattor";
import { NoticeService } from "../../services/notice";
import { cloudinary } from "../../utils/uploadImage";

// Student service
const service = new StudentService();
const noticeService = new NoticeService();

// Get single student data
export const singleStudent = asyncHandler(async (req, res) => {
  const studentData = await service.singleStudentById(req.tokenPayload?._id!);
  res.json(dataFormattor(studentData));
});

// Update student data
export const updateStudentData = asyncHandler(async (req, res) => {
  const { _id } = req?.tokenPayload!;
  await service.updateSingleStudent(_id, { mealPlan: req.body.mealPlan });
  res.json(dataFormattor("Student Updated"));
});

// Update profile image
export const updateProfileImage = asyncHandler(async (req, res) => {
  const { _id } = req?.tokenPayload!;
  const { profilePic } = req.body;
  const { url } = await cloudinary.uploader.upload(profilePic, {
    folder: "Hostel Management Project/students",
    format: "webp",
    unique_filename: true,
  });
  await service.updateSingleStudent(_id, { profilePic: url });
  res.json(dataFormattor({ url }));
});

// Selected meal plan
export const mealPlan = asyncHandler(async (req, res) => {
  const studentData = await service.singleStudentById(req.tokenPayload?._id!);
  res.json(dataFormattor(studentData?.mealPlan));
});

// Notices for students
export const notices = asyncHandler(async (req, res) => {
  const studentNotices = await noticeService.studentNotices();
  res.json(dataFormattor(studentNotices));
});

// Available meal plans
export const availableMealPlans = asyncHandler(async (req, res) => {
  console.log("available mealPlans");
});
