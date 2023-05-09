import asyncHandler from "express-async-handler";
import { StudentService } from "../../services/student";
import { dataFormattor } from "../../utils/JSON-formattor";
import { monthlyRentAmount, monthsArray } from "../../utils/OtherData";
import { presetMailTemplates, sendMail } from "../../utils/sendMail";

const studentService = new StudentService();

// Get all students with status departed and resident
export const allStudents = asyncHandler(async (req, res) => {
  // Refactoring query
  const filterObj = { ...req.query };
  for (const filter in filterObj) {
    if (!filterObj[filter] || !/^(name|status)$/.test(filter)) delete filterObj[filter];
  }
  if (typeof filterObj?.status === "string")
    if (!/^(departed|resident)$/.test(filterObj.status.toLowerCase())) delete filterObj.status;
  if (filterObj.name)
    filterObj.name = {
      $regex: filterObj.name,
      $options: "i",
    };
  const allStudentsData = await studentService.allStudentsData(filterObj);
  res.json(dataFormattor(allStudentsData));
});

// Update student payment amounts
export const updateStudentPayment = asyncHandler(async (req, res) => {
  const { mealPlan, balancePayment } = await studentService.singleStudentById(req.params._id);
  const billAmount =
    monthlyRentAmount + mealPlan.price + balancePayment + req.body.additionalAmount;
  const updatedStudent = await studentService.updateSingleStudent(req.params._id, {
    balancePayment: billAmount,
    lastBilledMonth: `${monthsArray[new Date().getMonth()]} ${new Date().getFullYear()}`,
  });
  sendMail(presetMailTemplates.monthlyPayment(updatedStudent.email, billAmount, balancePayment));
  res.json(dataFormattor("Payment Added successfully."));
});
