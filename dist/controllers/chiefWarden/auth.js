"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const chiefWarden_1 = require("../../repositories/chiefWarden");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const chiefWardenAuth = new chiefWarden_1.CWAuthRepo();
exports.login = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email);
});
