"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appError = void 0;
const ErrorResponses_1 = __importDefault(require("./ErrorResponses"));
const appError = (err, req, res, next) => {
    // Custom and expected errors handler
    if (err instanceof ErrorResponses_1.default) {
        return res.status(err.StatusCode).json({
            status: "fail",
            operational: true,
            message: err.message,
        });
    }
    // Unexpected errors handler
    console.log(err);
    return res.status(500).json({
        status: "error",
        message: 'Something went wrong!',
    });
    // Error Handler for development
    // console.log(err);
    // return res.status(500).json({
    //   error: err,
    //   message: err.message,
    // });
};
exports.appError = appError;
exports.default = exports.appError;
