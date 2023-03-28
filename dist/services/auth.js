"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const chiefWarden_1 = require("../models/chiefWarden");
const staff_1 = require("../models/staff");
const ErrorResponses_1 = __importDefault(require("../error/ErrorResponses"));
const passwordManager_1 = require("../utils/passwordManager");
class AuthService {
    // Generic Login Function for all
    async login(email, password) {
        const existingUser = await this.find(email.trim().toLowerCase());
        if (!existingUser) {
            throw ErrorResponses_1.default.noDataFound(this.role);
        }
        const validPassword = await (0, passwordManager_1.comparePassword)(password, existingUser.password);
        if (!validPassword) {
            throw ErrorResponses_1.default.unautharized("Invalid Password");
        }
        return existingUser;
    }
    // Generic Sign Up for all
    async signUp(data, role) {
        try {
            let collection;
            switch (role) {
                case "chief-warden": {
                    collection = chiefWarden_1.ChiefWardenModel;
                    break;
                }
                case "staff": {
                    collection = staff_1.StaffModel;
                    break;
                }
            }
            if (!collection)
                throw new Error("Error signin up " + role);
            data.password = await (0, passwordManager_1.hashPassword)(data.password);
            const newData = new collection(data);
            await newData.save();
        }
        catch (error) {
            throw ErrorResponses_1.default.mongoError(error);
        }
    }
}
exports.AuthService = AuthService;
