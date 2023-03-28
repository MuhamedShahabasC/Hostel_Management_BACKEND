"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleStaff = exports.singleDetails = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const JSON_formattor_1 = require("../../utils/JSON-formattor");
const staff_repository_1 = require("../../repositories/staff.repository");
const staff = new staff_repository_1.StaffRepo();
exports.singleDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const email = req.params.staff;
    const staffDetails = await staff.find(email);
    res.json((0, JSON_formattor_1.dataFormattor)(staffDetails));
});
exports.updateSingleStaff = (0, express_async_handler_1.default)(async (req, res) => {
    res.json("update single staff");
});
