import { ITaskContributor } from "shared/types/ITaskContributor";

export type TGetTaskContributorsByTaskIdResponse = ITaskContributor[];
export interface IGetTaskContributorsByTaskIdRequest {
  taskId: string;
}

export type TAddTaskContributorResponse = ITaskContributor;
export type TAddTaskContributorRequest = ITaskContributor;

export type TDeleteTaskContributorResponse = void;
export interface IDeleteTaskContributorRequest {
  id: string;
}
