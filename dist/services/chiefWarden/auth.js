"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
class AuthService {
    async login(email, password) {
        console.log(email, password);
        const user = await this.find(email);
        return console.log(user);
    }
}
exports.AuthService = AuthService;
// import { CWAuthRepo } from "../../repositories/chiefWarden";
// export class AuthService extends CWAuthRepo {
//   async login(email: string, password: string) {
//     return await this.findCW(email);
//   }
// }
