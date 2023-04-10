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

export interface IToken {
  _id: string;
}