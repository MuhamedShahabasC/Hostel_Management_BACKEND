"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiefWardenRepo = void 0;
const auth_1 = require("../services/auth");
const chiefWarden_1 = require("../models/chiefWarden");
const block_1 = require("../models/block");
const notice_1 = require("../models/notice");
class ChiefWardenRepo extends auth_1.AuthService {
    constructor() {
        super(...arguments);
        this.role = "chief-warden";
        // Show or hide notice
    }
    async find(email) {
        return await chiefWarden_1.ChiefWardenModel.findOne({ email });
    }
    // Create a new block
    async createBlock(data) {
        return await block_1.BlockModel.create(data);
    }
    // Create a new notice
    async createNotice(data) {
        return await notice_1.NoticeModel.create(data);
    }
    // Edit notice
    async editNotice(_id, data) {
        return await notice_1.NoticeModel.findOneAndUpdate({ _id }, data);
    }
}
exports.ChiefWardenRepo = ChiefWardenRepo;
