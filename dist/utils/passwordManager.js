"use strict";
// Module for managing passwords
// Current: bcrypt
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = 10;
const hashPassword = async (inputPassword) => {
    try {
        return await bcrypt_1.default.hash(inputPassword, saltRounds);
    }
    catch (error) {
        throw new Error("Error hashing password");
    }
};
exports.hashPassword = hashPassword;
const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        return await bcrypt_1.default.compare(inputPassword, hashedPassword);
    }
    catch (error) {
        throw new Error("Error comparing password");
    }
};
exports.comparePassword = comparePassword;
