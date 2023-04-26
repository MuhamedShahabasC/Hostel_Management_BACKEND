import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { IStaff, IStaffAddress } from "../../interfaces/staff";
import { StaffService } from "../../services/staff";
import { cloudinary } from "../../utils/uploadImage";

// Staff service instantiation
const service = new StaffService();

// Getting all staffs' data
export const allStaffs = asyncHandler(async (req, res) => {
  const allStaffData = await service.allStaffs();
  res.json(dataFormattor(allStaffData));
});

// Single staff details
export const singleStaff = asyncHandler(async (req, res) => {
  const staffDetails = await service.singleStaff(req.tokenPayload?.email!);
  res.json(dataFormattor(staffDetails));
});

// Update single staff
export const updateSingleStaff = asyncHandler(async (req, res) => {
  const { name, email, password, mobile, role, gender, address }: IStaff = req.body;
  let inputData: { [index: string]: string | number | IStaffAddress } = {
    name,
    password,
    mobile,
    role,
    gender,
    address,
  };
  const updatedData = await service.updateStaff(email, inputData);
  res.json(dataFormattor(updatedData));
});

// Update profile image
export const updateProfileImage = asyncHandler(async (req, res) => {
  const { email } = req?.tokenPayload!;
  const { profilePic } = req.body;
  const { url } = await cloudinary.uploader.upload(profilePic, {
    folder: "Hostel Management Project/staffs",
    format: "webp",
    unique_filename: true,
  });
  await service.updateStaff(email, { profilePic: url });
  res.json(dataFormattor({ url }));
});
