"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
class App {
    constructor() {
        this.dotenvConfig();
        this.app = (0, express_1.default)();
        this.bodyParser();
        this.routes();
        this.connectDB();
    }
    // dotenv Configuration
    dotenvConfig() {
        dotenv.config();
    }
    // Body Parser
    bodyParser() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
    // Routing
    routes() {
        this.app.all("/api/v1", (req, res) => {
            res.json("Welcome to Hostel Management App 🏨");
        });
        // Student routes
        this.app.use('/api/v1/students', (req, res) => {
            res.json("The student side of the Hostel Management App");
        });
        // Staff routes
        this.app.use('/api/v1/staffs', (req, res) => {
            res.json("The Staff side of the Hostel Management App");
        });
        // Chief Warden routes
        this.app.use('/api/v1/chief-warden', (req, res) => {
            res.json("The Chief-Warden side of the Hostel Management App");
        });
    }
    // Connecting the database - MongoDB
    connectDB() {
        (0, database_1.default)();
    }
}
exports.default = new App().app;
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
