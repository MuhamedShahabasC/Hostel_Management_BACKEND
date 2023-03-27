"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFormattor = void 0;
// Structuring data to be sent
const dataFormattor = (data) => {
    return {
        status: "success",
        data,
    };
};
exports.dataFormattor = dataFormattor;
