"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRepo = void 0;
const staff_1 = require("../models/staff");
const auth_1 = require("../services/auth");
class StaffRepo extends auth_1.AuthService {
    constructor() {
        super(...arguments);
        // Role of User
        this.role = "staff";
    }
    // Finding single staff
    async find(email) {
        return await staff_1.StaffModel.findOne({ email });
    }
    // Fetching all staffs
    async getAll() {
        return await staff_1.StaffModel.find({}, { password: 0, __v: 0 });
    }
}
exports.StaffRepo = StaffRepo;
