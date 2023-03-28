"use strict";
// Structuring JSON data to be sent
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFormattor = void 0;
const dataFormattor = (data) => {
    // Adding length property to JSON for Array
    if (data instanceof Array) {
        return {
            status: "success",
            count: data.length,
            data,
        };
    }
    else {
        return {
            status: "success",
            data,
        };
    }
};
exports.dataFormattor = dataFormattor;
