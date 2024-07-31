import { ITask } from "types/ITask";

export type TGetTasksByAssignedToUserIdResponse = ITask[];
export interface IGetTasksByAssignedToUserIdRequest {
  id: string;
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
  assignedToUserId?: string;
}

export type TDeleteTaskResponse = ITask;
export interface IDeleteTaskRequest {
  id: string;
}

export type TDeleteTasksByColumnIdResponse = void;
export interface IDeleteTasksByColumnIdRequest {
  columnId: string;
}

export type TDeleteTasksByProjectIdResponse = void;
export interface IDeleteTasksByProjectIdRequest {
  projectId: string;
}
