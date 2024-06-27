import { IUser } from "types/IUser";

export type TUserSignUpResponse = IUser;
export type TUserSignUpRequest = IUser;

export type TUserSignInResponse = IUser;
export interface IUserSignInRequest {
  email: string;
  password: string;
}

export type TUserGetMeResponse = IUser;
export interface IUserGetMeRequest {
  id: string;
}
