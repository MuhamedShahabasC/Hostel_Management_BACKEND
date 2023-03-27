"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/chiefWarden/auth");
const chiefWarden = (0, express_1.Router)();
chiefWarden.get("/", async (req, res) => {
    res.json("The Chief-Warden side of the Hostel Management App");
});
chiefWarden.post("/login", auth_1.login);
exports.default = chiefWarden;
