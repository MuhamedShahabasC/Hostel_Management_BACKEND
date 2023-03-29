"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiefWardenRepo = void 0;
const auth_1 = require("../services/auth");
const chiefWarden_1 = require("../models/chiefWarden");
const block_1 = require("../models/block");
class ChiefWardenRepo extends auth_1.AuthService {
    constructor() {
        super(...arguments);
        this.role = "chief-warden";
    }
    async find(email) {
        return await chiefWarden_1.ChiefWardenModel.findOne({ email });
    }
    // Create a new block
    async createBlock(data) {
        return await block_1.BlockModel.create(data);
    }
}
exports.ChiefWardenRepo = ChiefWardenRepo;
