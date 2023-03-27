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
const chiefWarden_routes_1 = __importDefault(require("./routes/chiefWarden.routes"));
const AppError_1 = __importDefault(require("./error/AppError")); // udane pottum appError
const _404_1 = __importDefault(require("./routes/404"));
class App {
    constructor() {
        this.dotenvConfig();
        this.app = (0, express_1.default)();
        this.bodyParser();
        this.routes();
        this.errorHandler();
        this.connectDB();
    }
    // dotenv Configuration
    dotenvConfig() {
        dotenv.config();
    }
    // Body Parser
    bodyParser() {
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
    }
    // Routing
    routes() {
        this.app.all("/api/v1", (req, res) => {
            res.json("Welcome to Hostel Management App 🏨");
        });
        this.app.use("/api/v1/students", (req, res) => {
            res.json("The student side of the Hostel Management App");
        });
        this.app.use("/api/v1/staffs", (req, res) => {
            res.json("The Staff side of the Hostel Management App");
        });
        this.app.use("/api/v1/chief-warden", chiefWarden_routes_1.default);
        // Handling 404 API endpoints
        this.app.use("*", _404_1.default);
    }
    // Global Error Handler
    errorHandler() {
        this.app.use(AppError_1.default);
    }
    // Connecting the database - MongoDB
    connectDB() {
        (0, database_1.default)();
    }
}
exports.default = new App().app;
