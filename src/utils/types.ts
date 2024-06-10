import { User as FirebaseUser } from "firebase/auth";

export type AuthActionResponseT =
  | {
      success: true;
      data?: {};
    }
  | {
      success: false;
      msg?: {} | string;
    }
  | null;

export type ContextT = {
  user: (FirebaseUser & { name: string }) | null;
  isAuthenticated: boolean | undefined;
  logout: () => Promise<AuthActionResponseT> | null;
  signIn: (
    email: string,
    password: string
  ) => Promise<AuthActionResponseT> | null;
  signUp: (
    username: string,
    email: string,
    password: string
  ) => Promise<AuthActionResponseT> | null;
};

export type LoginInputFormT = {
  email: string;
  password: string;
};

export type RegisterInputFormT = {
  username: string;
} & LoginInputFormT;
