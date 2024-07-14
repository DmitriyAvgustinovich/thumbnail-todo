import { ITask } from "types/ITask";

export type TGetAllProjectTasksResponse = ITask[];
export interface IGetAllProjectTasksRequest {
  projectId: string;
}

export type TGetTasksByCreatedUserIdResponse = ITask[];
export interface IGetTasksByCreatedUserIdRequest {
  createdUserId: string;
}

export type TGetTasksByColumnIdResponse = ITask[];
export interface IGetTasksByColumnIdRequest {
  columnId: string;
}

export type TGetTaskByIdResponse = ITask;
export interface IGetTaskByIdRequest {
  id: string;
}

export type TAddTaskResponse = ITask;
export type TAddTaskRequest = ITask;

export type TUpdateTaskResponse = ITask;
export interface IUpdateTaskRequest {
  id: string;
}

export type TDeleteTaskResponse = ITask;
export interface IDeleteTaskRequest {
  id: string;
}
