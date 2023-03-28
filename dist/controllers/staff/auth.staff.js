"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.newStaff = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.newStaff = (0, express_async_handler_1.default)((req, res) => {
    res.json("niceda mone");
});
exports.login = (0, express_async_handler_1.default)((req, res) => {
    res.json("login staff");
});
