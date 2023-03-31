import { Request, Response, Router } from "express";
import { allBlocks, newBlock } from "../controllers/chiefWarden/block";
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
import { validate_id } from "../middlewares/mongoId";

const chiefWarden = Router();

chiefWarden
  .route("/blocks")
  .get(allBlocks)
  .post(validate(newBlockSchema), newBlock);

chiefWarden.get("/", async (req: Request, res: Response) => {
  res.json("The Chief-Warden side of the Hostel Management App");
});

chiefWarden.post("/login", login);

// Notices
chiefWarden
  .route("/notices/:_id?")
  .get(singleNotice)
  .post(validate(noticeSchema), newNotice)
  .put(validate_id, validate(noticeSchema), updateNotice)
  .patch(validate_id, validate(noticeSchema), changeVisiblity)
  .delete(validate_id, deleteNotice);

chiefWarden.get("/notices/all", allNotices);

export default chiefWarden;
