"use strict";
// Module for token handling
// Current: JSON Web Token - JWT
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const signToken = (password) => {
    return (0, jsonwebtoken_1.sign)({ password }, process.env.JWT_SECRET, { expiresIn: "1d" });
};
exports.signToken = signToken;
