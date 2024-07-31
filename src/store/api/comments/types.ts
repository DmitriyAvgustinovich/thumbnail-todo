import { IComment } from "types/IComment";

export type TGetCommentsByTaskIdResponse = IComment[];
export interface IGetCommentsByTaskIdRequest {
  taskId: string;
}

export type TAddCommentResponse = IComment;
export type TAddCommentRequest = IComment;

export type TUpdateCommentResponse = IComment;
export interface IUpdateCommentRequest extends IComment {
  id: string;
}

export type TDeleteCommentResponse = void;
export interface IDeleteCommentRequest {
  id: string;
}

export type TDeleteCommentsByTaskIdResponse = void;
export interface IDeleteCommentsByTaskIdRequest {
  taskId: string;
}

export type TDeleteCommentsByColumnIdResponse = void;
export interface IDeleteCommentsByColumnIdRequest {
  columnId: string;
}

export type TDeleteCommentsByProjectIdResponse = void;
export interface IDeleteCommentsByProjectIdRequest {
  projectId: string;
}
