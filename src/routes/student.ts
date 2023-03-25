import express, { Request, Response } from "express";

const router = express.Router();

router.route("/signUp").get((req: Request, res: Response) => {
  res.json("signup student");
});
