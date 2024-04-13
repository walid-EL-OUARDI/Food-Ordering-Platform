export interface Function {
  [key: string]: () => Promise<void>;
}
export interface UserState {
  clientData: User | null;
  token: string | null;
  isAuthenticated: boolean | null;
}
export interface User {
  name: string;
  email: string;
}
export interface UserLoginCredentials {
  email: string;
  password: string;
}
export interface UserRegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}
