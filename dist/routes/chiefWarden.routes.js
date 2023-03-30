"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const block_1 = require("../controllers/chiefWarden/block");
const auth_1 = require("../controllers/chiefWarden/auth");
const validateBody_1 = require("../middlewares/validateBody");
const yupSchema_1 = require("../middlewares/yupSchema");
const notice_1 = require("../controllers/chiefWarden/notice");
const mongoId_1 = require("../middlewares/mongoId");
const chiefWarden = (0, express_1.Router)();
chiefWarden.get("/", async (req, res) => {
    res.json("The Chief-Warden side of the Hostel Management App");
});
chiefWarden.post("/login", auth_1.login);
chiefWarden.route("/blocks").post((0, validateBody_1.validate)(yupSchema_1.newBlockSchema), block_1.newBlock);
// Notices  
chiefWarden
    .route("/notices/:_id?")
    .get(notice_1.singleNotice)
    .post((0, validateBody_1.validate)(yupSchema_1.noticeSchema), notice_1.newNotice)
    .put(mongoId_1.validate_id, (0, validateBody_1.validate)(yupSchema_1.noticeSchema), notice_1.updateNotice)
    .patch(mongoId_1.validate_id, (0, validateBody_1.validate)(yupSchema_1.noticeSchema), notice_1.changeVisiblity)
    .delete(mongoId_1.validate_id, notice_1.deleteNotice);
exports.default = chiefWarden;
