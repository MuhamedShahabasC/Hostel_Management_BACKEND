// Custom type declarations

declare namespace Express {
  // Custom Request with token payload
  interface Request {
    tokenPayload?: {
      _id: string;
      email: string;
      role: "student" | "staff" | "chief-warden";
      department?: "maintenance" | "chef" | "warden";
    };
  }
}
