"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponses extends Error {
    constructor(StatusCode, message) {
        super(message);
        this.StatusCode = StatusCode;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    // Not found API end points
    static endPointNotFound(url) {
        return new ErrorResponses(404, `Invalid API endpoint - ${url}`);
    }
}
exports.default = ErrorResponses;
