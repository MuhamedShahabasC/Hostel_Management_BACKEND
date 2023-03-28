"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiefWardenModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const chiefWardenSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Chief Warden must have a name."],
        minlength: [3, "Name must not be shorter than 3 characters"],
        maxlength: [20, "Name must not be longer than 20 characters"],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Chief Warden must have an email."],
    },
    password: {
        type: String,
        required: [true, "Chief Warden must have a password."],
    },
    mobile: {
        type: Number,
        required: [true, "Chief Warden must have an contact number."],
    },
});
exports.ChiefWardenModel = (0, mongoose_2.model)("ChiefWarden", chiefWardenSchema);
