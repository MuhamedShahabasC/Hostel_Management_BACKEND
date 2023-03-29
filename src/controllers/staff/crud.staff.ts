import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StaffRepo } from "../../repositories/staff.repository";
import { IStaff } from "../../interfaces/staff";
import ErrorResponses from "../../error/ErrorResponses";

const staff = new StaffRepo();

export const singleDetails: RequestHandler = asyncHandler(async (req, res) => {
  const email = req.params.staff;
  const staffDetails = await staff.find(email);
  res.json(dataFormattor(staffDetails));
});

export const updateSingleStaff: RequestHandler = asyncHandler(
  async (req, res) => {
    const { name, email, password, mobile, role, gender, address }: IStaff =
      req.body;
    let inputData: { [index: string]: any } = {
      name,
      email,
      password,
      mobile,
      role,
      gender,
      address,
    };
    const updatedData = await staff.updateStaff(inputData);
    if (!updatedData) throw ErrorResponses.unautharized("No data provided");
    res.json(dataFormattor(updatedData));
  }
);
