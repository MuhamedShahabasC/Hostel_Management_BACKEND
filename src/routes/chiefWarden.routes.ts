import { Request, Response, Router } from "express";
import { newBlock } from "../controllers/chiefWarden/block";
import { login } from "../controllers/chiefWarden/auth";
import { validate } from "../middlewares/validateBody";
import { newBlockSchema } from "../middlewares/yupSchema";
const chiefWarden = Router();

chiefWarden.get("/", async (req: Request, res: Response) => {
  res.json("The Chief-Warden side of the Hostel Management App");
});

chiefWarden.post("/login", login);
chiefWarden.route("/block").post(validate(newBlockSchema), newBlock);

export default chiefWarden;
