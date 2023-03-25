"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = async () => {
    try {
        const connect = await mongoose_1.default.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "HostelManagement",
        });
        console.log("Database is connected");
    }
    catch (error) {
        console.log(error.message);
    }
};
exports.default = connectDB;
