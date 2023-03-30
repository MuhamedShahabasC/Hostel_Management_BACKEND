import { Request, Response, Router } from "express";
import { newBlock } from "../controllers/chiefWarden/block";
import { login } from "../controllers/chiefWarden/auth";
import { validate } from "../middlewares/validateBody";
import { newBlockSchema, noticeSchema } from "../middlewares/yupSchema";
import { changeVisiblity, newNotice, updateNotice,singleNotice, deleteNotice } from "../controllers/chiefWarden/notice";
import { validate_id } from "../middlewares/mongoId";
const chiefWarden = Router();

chiefWarden.get("/", async (req: Request, res: Response) => {
  res.json("The Chief-Warden side of the Hostel Management App");
});

chiefWarden.post("/login", login);
chiefWarden.route("/blocks").post(validate(newBlockSchema), newBlock);

// Notices  
chiefWarden
  .route("/notices/:_id?")
  .get(singleNotice)
  .post(validate(noticeSchema), newNotice)
  .put(validate_id, validate(noticeSchema), updateNotice)
  .patch(validate_id,validate(noticeSchema), changeVisiblity)
  .delete(validate_id, deleteNotice)

export default chiefWarden;
