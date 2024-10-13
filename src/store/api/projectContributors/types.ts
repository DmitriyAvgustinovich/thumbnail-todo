import { IProjectContributor } from "shared/types/IProjectContributor";

export type TGetProjectContributorsByProjectIdResponse = IProjectContributor[];
export interface IGetProjectContributorsByProjectIdRequest {
  projectId: string;
}

export type TAddProjectContributorResponse = IProjectContributor;
export type TAddProjectContributorRequest = IProjectContributor;

export type TDeleteProjectContributorResponse = void;
export interface IDeleteProjectContributorRequest {
  id: string;
}

export type TDeleteProjectContributorsByProjectIdResponse = void;
export interface IDeleteProjectContributorsByProjectIdRequest {
  projectId: string;
}
