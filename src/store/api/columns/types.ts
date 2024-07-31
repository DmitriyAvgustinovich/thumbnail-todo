import { IColumn } from "types/IColumn";

export type TGetColumnsByProjectIdResponse = IColumn[];
export interface IGetColumnsByProjectIdRequest {
  projectId: string;
}

export type TGetColumnByIdResponse = IColumn;
export interface IGetColumnByIdRequest {
  id: string;
}

export type TAddColumnResponse = IColumn;
export type TAddColumnRequest = IColumn;

export type TUpdateColumnResponse = IColumn;
export interface IUpdateColumnRequest extends IColumn {
  id: string;
}

export type TDeleteColumnResponse = void;
export interface IDeleteColumnRequest {
  id: string;
}

export type TDeleteColumnsByProjectIdResponse = void;
export interface IDeleteColumnsByProjectIdRequest {
  projectId: string;
}
