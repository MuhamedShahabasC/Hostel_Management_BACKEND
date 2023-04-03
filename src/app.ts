import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/database";
import chiefWardenRoutes from "./routes/chiefWarden.routes";
import globalErrorHandler from "./error/appError";
import endPointNotFound from "./routes/404";
import staffRoutes from "./routes/staff.routes";
import cors from "cors";

class App {
  public app: express.Application;

  constructor() {
    this.dotenvConfig();
    this.app = express();
    this.cors();
    this.bodyParser();
    this.routes();
    this.errorHandler();
    this.connectDB();
  }

  // dotenv Configuration
  private dotenvConfig(): void {
    dotenv.config();
  }

  // CORS Cofiguration
  private cors(): void {
    this.app.use(
      cors({
        origin: [process.env.FRONTEND as string],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
      })
    );
  }

  // Body Parser
  private bodyParser(): void {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  // Routing
  private routes(): void {
    this.app.all("/api/v1", (req: Request, res: Response) => {
      res.json("Welcome to Hostel Management App 🏨");
    });

    this.app.use("/api/v1/students", (req: Request, res: Response) => {
      res.json("The student side of the Hostel Management App");
    });

    this.app.use("/api/v1/staffs", staffRoutes);

    this.app.use("/api/v1/chief-warden", chiefWardenRoutes);

    // Handling 404 API endpoints
    this.app.use("*", endPointNotFound);
  }

  // Global Error Handler
  private errorHandler(): void {
    this.app.use(globalErrorHandler);
  }

  // Connecting the database - MongoDB
  private connectDB(): void {
    connectDB();
  }
}

export default new App().app;
