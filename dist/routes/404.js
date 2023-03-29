"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ErrorResponses_1 = __importDefault(require("../error/ErrorResponses"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const notFound = (0, express_1.Router)();
// Handling 404 endpoints 
notFound.all("/", (0, express_async_handler_1.default)(async (req, res) => {
    throw ErrorResponses_1.default.endPointNotFound(req.originalUrl);
}));
exports.default = notFound;
