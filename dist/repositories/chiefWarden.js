"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CWAuthRepo = void 0;
const auth_1 = require("../services/auth");
const chiefWarden_1 = require("../models/chiefWarden/chiefWarden");
class CWAuthRepo extends auth_1.AuthService {
    async find(email) {
        return await chiefWarden_1.ChiefWardenModel.findOne({ email });
    }
}
exports.CWAuthRepo = CWAuthRepo;
// import { ChiefWardenModel } from "../models/chiefWarden/chiefWarden";
// export abstract class CWAuthRepo {
//   async findCW(email: string) {
//     return await ChiefWardenModel.findOne({ email });
//   }
// }
