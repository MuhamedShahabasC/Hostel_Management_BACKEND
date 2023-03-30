"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponses extends Error {
    constructor(StatusCode, message) {
        super(message);
        this.StatusCode = StatusCode;
        this.message = message;
        Object.setPrototypeOf(this, new.target.prototype);
    }
    // Unauthorized or Invalid Credentials
    static unautharized(invalidData) {
        return new ErrorResponses(401, invalidData);
    }
    // No data found
    static noDataFound(data) {
        return new ErrorResponses(404, `No ${data} found.`);
    }
    // Bad Request / Invalid MongoDB ID
    static badRequest() {
        return new ErrorResponses(400, 'Bad Request');
    }
    // MongoDB Error (including MongoDB Validation)
    static mongoError(mongoError) {
        for (const err in mongoError.errors) {
            return new ErrorResponses(403, mongoError.errors[err].properties.message);
        }
        return new ErrorResponses(500, "Internal server error");
    }
    // Not found API end points
    static endPointNotFound(url) {
        return new ErrorResponses(404, `Cannot find ${url} on this server.`);
    }
}
exports.default = ErrorResponses;
