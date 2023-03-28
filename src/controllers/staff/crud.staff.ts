import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StaffRepo } from "../../repositories/staff.repository";

const staff = new StaffRepo();

export const singleDetails: RequestHandler = asyncHandler(async (req, res) => {
  const email = req.params.staff;
  const staffDetails = await staff.find(email);
  res.json(dataFormattor(staffDetails));
});

export const updateSingleStaff: RequestHandler = asyncHandler(async (req, res) => {
    res.json("update single staff");
  }
);
