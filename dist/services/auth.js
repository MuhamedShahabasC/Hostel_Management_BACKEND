"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    async login(email, password) {
        const existingUser = await this.find(email);
        if (!existingUser) {
            throw new Error('User not found');
        }
        return existingUser;
    }
}
exports.AuthService = AuthService;
