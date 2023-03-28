"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChiefWardenModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
// Chief Warden Schema with Validation
const chiefWardenSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Chief Warden must have a name."],
        minlength: [3, "Name must not be shorter than 3 characters"],
        maxlength: [20, "Name must not be longer than 20 characters"],
        validate: { validator: validator_1.default.isAlpha, message: "Invalid Name" },
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Chief Warden must have an email."],
        validate: { validator: validator_1.default.isEmail, message: "Invalid e-Mail" },
    },
    password: {
        type: String,
        required: [true, "Chief Warden must have a password."],
    },
    mobile: {
        type: Number,
        required: [true, "Chief Warden must have an contact number."],
        validate: {
            validator: (number) => number.toString().length === 10,
            message: "Invalid phone number!",
        },
    },
});
exports.ChiefWardenModel = (0, mongoose_1.model)("ChiefWarden", chiefWardenSchema);
