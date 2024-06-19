export interface IUserSignUpResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserSignUpRequest {
  email: string;
  password: string;
}

export interface IUserSignInResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserSignInRequest {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserGetMeResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface IUserGetMeRequest {
  id: string;
}
