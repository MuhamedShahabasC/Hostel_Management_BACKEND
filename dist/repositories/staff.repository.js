"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffRepo = void 0;
const staff_1 = require("../models/staff");
const auth_1 = require("../services/auth");
class StaffRepo extends auth_1.AuthService {
    constructor() {
        super(...arguments);
        this.role = "staff";
    }
    async find(email) {
        return await staff_1.StaffModel.findOne({ email });
    }
}
exports.StaffRepo = StaffRepo;
