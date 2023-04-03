import { Request, Response, Router } from "express";
import {
  allBlocks,
  deleteBlock,
  newBlock,
  updateRoom,
} from "../controllers/chiefWarden/block";
import { login } from "../controllers/chiefWarden/auth";
import { validate } from "../middlewares/validateBody";
import { newBlockSchema, noticeSchema } from "../middlewares/yupSchema";
import {
  changeVisiblity,
  newNotice,
  updateNotice,
  singleNotice,
  deleteNotice,
  allNotices,
} from "../controllers/chiefWarden/notice";
import { validate_id } from "../middlewares/validateParams";

const chiefWarden = Router();

// Login
chiefWarden.post("/login", login);

// Blocks and Rooms
chiefWarden
  .route("/blocks/:_id?")
  .get(allBlocks)
  .post(validate(newBlockSchema), newBlock)
  .patch(validate_id,updateRoom) // PENDING WORK
  .delete(validate_id, deleteBlock);

// Notices
chiefWarden.get("/notices/all", allNotices);
chiefWarden
  .route("/notices/:_id?")
  .get(validate_id, singleNotice)
  .post(validate(noticeSchema), newNotice)
  .put(validate_id, validate(noticeSchema), updateNotice)
  .patch(validate_id, validate(noticeSchema), changeVisiblity)
  .delete(validate_id, deleteNotice);

export default chiefWarden;
