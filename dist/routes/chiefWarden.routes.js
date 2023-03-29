"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const block_1 = require("../controllers/chiefWarden/block");
const auth_1 = require("../controllers/chiefWarden/auth");
const validateBody_1 = require("../middlewares/validateBody");
const yupSchema_1 = require("../middlewares/yupSchema");
const chiefWarden = (0, express_1.Router)();
chiefWarden.get("/", async (req, res) => {
    res.json("The Chief-Warden side of the Hostel Management App");
});
chiefWarden.post("/login", auth_1.login);
chiefWarden.route("/block").post((0, validateBody_1.validate)(yupSchema_1.newBlockSchema), block_1.newBlock);
exports.default = chiefWarden;
