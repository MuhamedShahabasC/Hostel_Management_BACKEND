import { Request, Response, Router } from "express";
import { login } from "../controllers/chiefWarden/auth";
const chiefWarden = Router();

chiefWarden.get("/", async (req: Request, res: Response) => {
  res.json("The Chief-Warden side of the Hostel Management App");
});

chiefWarden.post("/login", login);

export default chiefWarden;
