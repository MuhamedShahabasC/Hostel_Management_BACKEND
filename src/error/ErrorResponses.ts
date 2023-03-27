export default class ErrorResponses extends Error {
  constructor(public StatusCode: number, public message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }

  // Unauthorized or Invalid Credentials
  static unautharized(invalidData: string): ErrorResponses {
    return new ErrorResponses(401, invalidData);
  }

  // No data found
  static noDataFound(data: string): ErrorResponses {
    return new ErrorResponses(404, `No ${data} found.`);
  }

  // Not found API end points
  static endPointNotFound(url: string): ErrorResponses {
    return new ErrorResponses(404, `Cannot find ${url} on this server.`);
  }
}
