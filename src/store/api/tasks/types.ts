import { ITask } from "types/ITask";

export type TGetAllTasksResponse = ITask[];
export type TGetAllTasksRequest = void;

export type TGetTasksByUserIdResponse = ITask[];
export interface IGetTasksByUserIdRequest {
  userId: string;
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
