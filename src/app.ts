import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import connectDB from "./config/database";

class App {
  public app: express.Application;

  constructor() {
    this.dotenvConfig();
    this.app = express();
    this.bodyParser();
    this.routes();
    this.connectDB();
  }

  // dotenv Configuration
  private dotenvConfig(): void {
    dotenv.config();
  }

  // Body Parser
  private bodyParser(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  // Routing
  private routes(): void {
  
    this.app.all("/api/v1", (req: Request, res: Response) => {
      res.json("Welcome to Hostel Management App 🏨");
    });

    // Student routes
    this.app.use('/api/v1/students', (req: Request, res: Response) => {
      res.json("The student side of the Hostel Management App");
    })

    // Staff routes
    this.app.use('/api/v1/staffs', (req: Request, res: Response) => {
      res.json("The Staff side of the Hostel Management App");
    })

    // Chief Warden routes
    this.app.use('/api/v1/chief-warden', (req: Request, res: Response) => {
      res.json("The Chief-Warden side of the Hostel Management App");
    })
  }

  // Connecting the database - MongoDB
  private connectDB(): void {
    connectDB();
  }
}

export default new App().app;

// import * as dotenv from "dotenv";
// dotenv.config();
// import express, { Application, Request, Response } from "express";
// import connectDB from "./config/database";

// // Express
// const app: Application = express();

// // Req.body
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.get("/", (req: Request, res: Response) => {
//   res.json("Server is running");
// });

// // Connect Database
// connectDB();

// // Server
// app.listen(process.env.PORT, () => {
//   console.log(`Server is running on ${process.env.PORT}`);
// });
