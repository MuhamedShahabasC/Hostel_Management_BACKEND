"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAll = exports.login = exports.newStaff = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const JSON_formattor_1 = require("../../utils/JSON-formattor");
const staff_repository_1 = require("../../repositories/staff.repository");
const tokenManager_1 = require("../../utils/tokenManager");
const staffAuth = new staff_repository_1.StaffRepo();
exports.newStaff = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password, mobile, role, gender, address } = req.body;
    const signUpData = {
        name,
        email,
        password,
        mobile,
        role,
        gender,
        address,
    };
    await staffAuth.signUp(signUpData, "staff");
    res.json((0, JSON_formattor_1.dataFormattor)("Signed Up"));
});
exports.login = (0, express_async_handler_1.default)(async (req, res) => {
    const { email, password } = req.body;
    const staffData = await staffAuth.login(email, password);
    res.json({
        ...(0, JSON_formattor_1.dataFormattor)(staffData),
        token: (0, tokenManager_1.signToken)(staffData.password),
    });
});
exports.getAll = (0, express_async_handler_1.default)(async (req, res) => {
    const allStaffs = await staffAuth.getAll();
    res.json((0, JSON_formattor_1.dataFormattor)(allStaffs));
});
