import asyncHandler from "express-async-handler";
import { StaffService } from "../../services/staff";
import { dataFormattor } from "../../utils/JSON-formattor";
import { Department, IStaff } from "../../interfaces/staff";
import { StaffAuth } from "../../repositories/staff";

const staffService = new StaffService();
const staffAuth = new StaffAuth();

// New Staff
export const newStaff = asyncHandler(async (req, res) => {
  await staffAuth.signUp(req.body);
  res.json(dataFormattor(`Signed up successfully`));
});

// Get all staffs with filter and search
export const allStaffsData = asyncHandler(async (req, res) => {
  // Refactoring query
  const filterObj = { ...req.query };
  for (const filter in filterObj) {
    if (!filterObj[filter] || !/^(name|role)$/.test(filter)) delete filterObj[filter];
  }
  if (filterObj.name)
    filterObj.name = {
      $regex: filterObj.name,
      $options: "i",
    };
  const allStaffsData = await staffService.allStaffs(filterObj);
  res.json(dataFormattor(allStaffsData));
});

// Get staffs by department
export const staffsByDept = asyncHandler(async (req, res) => {
  const staffData = await staffService.staffsByDept(req.params.department as Department);
  res.json(dataFormattor(staffData));
});
