"use strict";
// Structuring JSON data to be sent
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFormattor = void 0;
const dataFormattor = (data) => {
    // Adding length property to JSON for Array
    const status = "success";
    if (data instanceof Array) {
        return {
            status,
            count: data.length,
            data,
        };
    }
    else if (typeof data === "string") {
        return {
            status,
            message: data,
        };
    }
    else {
        return {
            status,
            data,
        };
    }
};
exports.dataFormattor = dataFormattor;
