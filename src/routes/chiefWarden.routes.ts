import { Request, Response, Router } from "express";
import { newBlock } from "../controllers/chiefWarden/block";
import { login } from "../controllers/chiefWarden/auth";
import { validate } from "../middlewares/validateBody";
import { newBlockSchema, noticeSchema } from "../middlewares/yupSchema";
import { newNotice } from "../controllers/chiefWarden/notice";
const chiefWarden = Router();

chiefWarden.get("/", async (req: Request, res: Response) => {
  res.json("The Chief-Warden side of the Hostel Management App");
});

chiefWarden.post("/login", login);
chiefWarden.route("/blocks").post(validate(newBlockSchema), newBlock);

chiefWarden.route("/notices").post(validate(noticeSchema), newNotice);

export default chiefWarden;
