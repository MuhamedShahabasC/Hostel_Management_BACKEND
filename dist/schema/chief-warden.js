"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ChiefWardenSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    password: String,
});
exports.default = ChiefWardenSchema;
