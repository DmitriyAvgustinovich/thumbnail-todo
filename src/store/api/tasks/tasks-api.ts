import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteTaskRequest,
  IGetTaskByIdRequest,
  IGetTasksByCreatedUserIdRequest,
  IUpdateTaskRequest,
  TAddTaskRequest,
  TAddTaskResponse,
  TDeleteTaskResponse,
  IGetAllProjectTasksRequest,
  TGetAllProjectTasksResponse,
  TGetTaskByIdResponse,
  TGetTasksByCreatedUserIdResponse,
  TUpdateTaskResponse,
  TGetTasksByColumnIdResponse,
  IGetTasksByColumnIdRequest,
} from "./types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getAllProjectTasks: builder.query<
      TGetAllProjectTasksResponse,
      IGetAllProjectTasksRequest
    >({
      query: (body) => `tasks?projectId=${body.projectId}`,
      providesTags: ["Tasks"],
    }),

    getTasksByCreatedUserId: builder.query<
      TGetTasksByCreatedUserIdResponse,
      IGetTasksByCreatedUserIdRequest
    >({
      query: (body) => ({
        url: `tasks?createdUserId=${body.createdUserId}`,
      }),
      providesTags: ["Tasks"],
    }),

    getTasksByColumnId: builder.query<
      TGetTasksByColumnIdResponse,
      IGetTasksByColumnIdRequest
    >({
      query: (body) => ({
        url: `tasks?columnId=${body.columnId}`,
      }),
      providesTags: ["Tasks"],
    }),

    getTaskById: builder.query<TGetTaskByIdResponse, IGetTaskByIdRequest>({
      query: (id) => `tasks/${id}`,
      providesTags: ["Tasks"],
    }),

    addTask: builder.mutation<TAddTaskResponse, TAddTaskRequest>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation<TUpdateTaskResponse, IUpdateTaskRequest>({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation<TDeleteTaskResponse, IDeleteTaskRequest>({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetAllProjectTasksQuery,
  useGetTasksByCreatedUserIdQuery,
  useGetTasksByColumnIdQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
