export interface LoginCred {
  email: string;
  password: string;
}

export interface CheckAuth {
  _id: string;
  name: string;
  email: string;
  mobile: string;
}

// Token
export interface IToken {
  _id: string;
  email: string;
  role: TokenRole;
  department?: TokenDepartment;
}
export type TokenRole = "student" | "staff" | "chief-warden";
export type TokenDepartment = "maintenance" | "chef" | "warden";
