export default class ErrorResponses extends Error {
  constructor(public StatusCode: number, public message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }


  // Not found API end points
  static endPointNotFound(url: string): ErrorResponses {
    return new ErrorResponses(404,`Invalid API endpoint - ${url}`);
  }
}
