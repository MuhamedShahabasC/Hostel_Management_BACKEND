"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const ErrorResponses_1 = __importDefault(require("../error/ErrorResponses"));
const passwordManager_1 = require("../utils/passwordManager");
class AuthService {
    async login(email, password) {
        const existingUser = await this.find(email.toLowerCase());
        if (!existingUser) {
            throw ErrorResponses_1.default.noDataFound(this.role);
        }
        const validPassword = await (0, passwordManager_1.comparePassword)(password, existingUser.password);
        if (!validPassword) {
            throw ErrorResponses_1.default.unautharized("Invalid Password");
        }
        return existingUser;
    }
}
exports.AuthService = AuthService;
