"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModel = void 0;
const mongoose_1 = require("mongoose");
const validator_1 = __importDefault(require("validator"));
// STAFF Schema with Validation
const staffSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "A Staff must have a name."],
        minlength: [3, "Name must be longer than 3 characters"],
        maxlength: [20, "Name must be shorter than 20 characters"],
        trim: true,
        validate: {
            validator: validator_1.default.isAlpha,
            message: "Invalid Name",
        },
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "A Staff must have an email."],
        validate: {
            validator: validator_1.default.isEmail,
            message: "Invalid e-Mail",
        },
    },
    password: {
        type: String,
        required: [true, "A Staff must have a password."],
    },
    mobile: {
        type: Number,
        required: [true, "A Staff must have an contact number."],
        validate: {
            validator: (number) => number.toString().length === 10,
            message: "Invalid phone number!",
        },
    },
    role: {
        type: String,
        enum: {
            values: ["warden"],
            message: "Invalid warden ({VALUE}) : Must be warden / ...",
        },
    },
    gender: {
        type: String,
        enum: {
            values: ["male", "female"],
            message: "Invalid gender ({VALUE}) : Must be male or female.",
        },
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dqrnskj2b/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1679929217/staff-avatars/staff-default_azorqn.jpg",
    },
    address: {
        type: {
            building: {
                type: String,
                trim: true,
                required: [true, "Invalid building in Address"],
            },
            city: {
                type: String,
                trim: true,
                required: [true, "Invalid city in Address"],
            },
            pin: {
                type: Number,
                trim: true,
                required: [true, "Invalid pin in Address"],
            },
            state: {
                type: String,
                trim: true,
                required: [true, "Invalid state in Address"],
            },
            country: {
                type: String,
                trim: true,
                required: [true, "Invalid country in Address"],
            },
        },
        required: [true, "Invalid address"],
    },
}, { timestamps: true });
exports.StaffModel = (0, mongoose_1.model)("Staff", staffSchema);
