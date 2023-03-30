// import asyncHandler from "express-async-handler";
// import { dataFormattor } from "../../utils/JSON-formattor";
// import validator from "validator";
// import ErrorResponses from "../../error/ErrorResponses";
// import { NoticeService } from "../../services/notice";

// const service = new NoticeService();

// export const singleNotice = asyncHandler(async (req, res) => {
//   const { _id } = req.params;
//   const noticeDetails = await service.singleNotice(_id);
//   res.json(dataFormattor(noticeDetails));
// });

// export const newNotice = asyncHandler(async (req, res) => {
//   await service.newNotice(req.body);
//   res.json(dataFormattor(`Notice posted successfully`));
// });

// export const updateNotice = asyncHandler(async (req, res) => {
//   const { _id } = req.params;
//   await service.updateNotice(_id, req.body);
//   res.json(dataFormattor("Notice updated successfully"));
// });

// export const changeVisiblity = asyncHandler(async (req, res) => {
//   const { _id } = req.params;
//   const { visibility } = req.body;
//   await service.changeVisibility(_id, !visibility);
//   res.json(dataFormattor(`Notice is ${!visibility ? "visible" : "hidden"}`));
// });

// export const deleteNotice = asyncHandler(async (req, res) => {
//   const { _id } = req.params;
//   await service.deleteNotice(_id);
//   res.json(dataFormattor("Notice deleted successfully"));
// });
