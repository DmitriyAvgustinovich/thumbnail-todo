import { IProject } from "shared/types/IProject";

export type TGetAllProjectsResponse = IProject[];
export type TGetAllProjectsRequest = void;

export type TGetProjectByIdResponse = IProject;
export interface IGetProjectByIdRequest {
  id?: string;
}

export type TAddProjectResponse = IProject;
export type TAddProjectRequest = IProject;

export type TUpdateProjectResponse = IProject;
export interface IUpdateProjectRequest extends IProject {
  id: string;
}

export type TDeleteProjectResponse = void;
export interface IDeleteProjectRequest {
  id: string;
}

export type TGetProjectsByAdminUserIdResponse = IProject[];
export interface IGetProjectsByAdminUserIdRequest {
  adminUserId: string;
}
