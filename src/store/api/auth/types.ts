import { IUser } from "types/IUser";

export type TUserSignUpResponse = IUser;
export interface IUserSignUpRequest {
  email: string;
  password: string;
}

export type TUserSignInResponse = IUser;
export type TUserSignInRequest = IUser;

export type TUserGetMeResponse = IUser;
export interface IUserGetMeRequest {
  id: string;
}
