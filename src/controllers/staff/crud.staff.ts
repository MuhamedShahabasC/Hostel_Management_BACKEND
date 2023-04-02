import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { IStaff, IStaffAddress } from "../../interfaces/staff";
import { StaffService } from "../../services/staff";

// Staff service instantiation
const service = new StaffService();

// Getting all staffs' data
export const allStaffs: RequestHandler = asyncHandler(async (req, res) => {
  const allStaffData = await service.allStaffs();
  res.json(dataFormattor(allStaffData));
});

// Single staff details
export const singleStaff: RequestHandler = asyncHandler(async (req, res) => {
  const { email } = req.params;
  const staffDetails = await service.singleStaff(email);
  res.json(dataFormattor(staffDetails));
});

// Update single staff
export const updateSingleStaff: RequestHandler = asyncHandler(
  async (req, res) => {
    const { name,email, password, mobile, role, gender, address }: IStaff = req.body;
    let inputData: { [index: string]: string | number | IStaffAddress } = {
      name, password, mobile, role, gender, address,
    };
    const updatedData = await service.updateStaff(email,inputData);
    res.json(dataFormattor(updatedData));
  }
);
