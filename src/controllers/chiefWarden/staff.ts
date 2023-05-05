import expressAsyncHandler from "express-async-handler";
import { StaffService } from "../../services/staff";
import { dataFormattor } from "../../utils/JSON-formattor";
import { Department } from "src/interfaces/staff";

const service = new StaffService();

// Get all staffs by department
export const staffsByDept = expressAsyncHandler(async (req, res) => {
  const staffData = await service.staffsByDept(req.params.department as Department);
  res.json(dataFormattor(staffData));
});
