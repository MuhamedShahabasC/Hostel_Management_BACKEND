"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const ErrorResponses_1 = __importDefault(require("../error/ErrorResponses"));
// Validating req.body before reaching controller and ignoring all unwanted data
const validate = (schema) => {
    return (0, express_async_handler_1.default)(async (req, res, next) => {
        try {
            req.body = await schema.validate(req.body, { stripUnknown: true });
            next();
        }
        catch (err) {
            throw ErrorResponses_1.default.unautharized(err.errors[0]);
        }
    });
};
exports.validate = validate;
