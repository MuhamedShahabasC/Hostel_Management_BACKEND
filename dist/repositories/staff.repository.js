"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRepo = void 0;
const staff_1 = require("../models/staff");
const auth_1 = require("../services/auth");
const passwordManager_1 = require("../utils/passwordManager");
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
    // Update single staff
    async updateStaff(data) {
        data.password = await (0, passwordManager_1.hashPassword)(data.password);
        return await staff_1.StaffModel.findOneAndUpdate({ email: data.email }, data, {
            runValidators: true,
            new: true,
        });
    }
}
exports.StaffRepo = StaffRepo;
