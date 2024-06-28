import { IProject } from "types/IProject";

export type TGetAllProjectsResponse = IProject[];
export type TGetAllProjectsRequest = void;

export type TGetProjectByIdResponse = IProject;
export interface IGetProjectByIdRequest {
  id: number;
}

export type TAddProjectResponse = IProject;
export type TAddProjectRequest = IProject;

export type TUpdateProjectResponse = IProject;
export interface IUpdateProjectRequest extends IProject {
  id: number;
}

export type TDeleteProjectResponse = void;
export interface IDeleteProjectRequest {
  id: number;
}

export type TGetProjectsByAdminUserIdResponse = IProject[];
export interface IGetProjectsByAdminUserIdRequest {
  adminUserId: string;
}
