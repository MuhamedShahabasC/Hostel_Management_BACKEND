"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSingleStaff = exports.singleDetails = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const JSON_formattor_1 = require("../../utils/JSON-formattor");
const staff_repository_1 = require("../../repositories/staff.repository");
const ErrorResponses_1 = __importDefault(require("../../error/ErrorResponses"));
const staff = new staff_repository_1.StaffRepo();
exports.singleDetails = (0, express_async_handler_1.default)(async (req, res) => {
    const email = req.params.staff;
    const staffDetails = await staff.find(email);
    res.json((0, JSON_formattor_1.dataFormattor)(staffDetails));
});
exports.updateSingleStaff = (0, express_async_handler_1.default)(async (req, res) => {
    const { name, email, password, mobile, role, gender, address } = req.body;
    let inputData = {
        name,
        email,
        password,
        mobile,
        role,
        gender,
        address,
    };
    // Checking for corrupted data
    // for (const property in inputData) {
    //   if (!inputData[property] || !inputData[property].toString().length)
    //     throw ErrorResponses.unautharized("Invalid data provided");
    //   if (property === "address") {
    //     for (const address in inputData[property]) {
    //       if (
    //         !inputData[property][address] ||
    //         !inputData[property].toString().length
    //       )
    //         throw ErrorResponses.unautharized("Invalid data provided");
    //     }
    //   }
    // }
    const updatedData = await staff.updateStaff(inputData);
    if (!updatedData)
        throw ErrorResponses_1.default.unautharized("No data provided");
    res.json((0, JSON_formattor_1.dataFormattor)(updatedData));
});
