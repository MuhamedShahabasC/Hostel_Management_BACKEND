"use strict";
// Trimming string
Object.defineProperty(exports, "__esModule", { value: true });
exports.trimmer = void 0;
const trimmer = (data) => {
    let trimmedData = data;
    for (const key in trimmedData) {
        if (typeof data[key] === "string")
            data[key].trim();
    }
    return trimmedData;
};
exports.trimmer = trimmer;
