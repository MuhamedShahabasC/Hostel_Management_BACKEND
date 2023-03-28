"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStaff = exports.validateLogin = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ErrorResponses_1 = __importDefault(require("../error/ErrorResponses"));
const yupSchema_1 = require("./yupSchema");
// Validating req.body before reaching controller
// Login body validation
exports.validateLogin = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        req.body = await yupSchema_1.login.validate(req.body);
        next();
    }
    catch (err) {
        throw ErrorResponses_1.default.unautharized(err.errors[0]);
    }
});
// Staff body validation
exports.validateStaff = (0, express_async_handler_1.default)(async (req, res, next) => {
    try {
        req.body = await yupSchema_1.staffSchema.validate(req.body);
        next();
    }
    catch (err) {
        throw ErrorResponses_1.default.unautharized(err.errors[0]);
    }
});
