"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appError = void 0;
const ErrorResponses_1 = __importDefault(require("./ErrorResponses"));
const appError = (err, req, res, next) => {
    if (err instanceof ErrorResponses_1.default) {
        return res.status(err.StatusCode).json({
            status: "fail",
            message: err.message,
        });
    }
    // if (err.message === "ValidationError")
    //   return res
    //     .status(403)
    //     .json({ status: "fail", message: err.message, name: err.name });
    return res.status(500).json({
        status: "error",
        message: err.message,
        // message: 'Something went wrong!',
    });
    // DEV ERROR
    // console.log(err);
    // return res.status(500).json({
    //   error: err,
    //   message: err.message,
    // });
};
exports.appError = appError;
exports.default = exports.appError;
