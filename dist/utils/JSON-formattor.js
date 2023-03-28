"use strict";
// Structuring data to be sent
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataFormattor = void 0;
const dataFormattor = (data) => {
    return {
        status: "success",
        data,
    };
};
exports.dataFormattor = dataFormattor;
