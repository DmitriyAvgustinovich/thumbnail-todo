import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteTaskRequest,
  IGetTaskByIdRequest,
  IGetTasksByUserIdRequest,
  IUpdateTaskRequest,
  TAddTaskRequest,
  TAddTaskResponse,
  TDeleteTaskResponse,
  TGetAllTasksRequest,
  TGetAllTasksResponse,
  TGetTaskByIdResponse,
  TGetTasksByUserIdResponse,
  TUpdateTaskResponse,
} from "./types";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getAllTasks: builder.query<TGetAllTasksResponse, TGetAllTasksRequest>({
      query: () => "tasks",
      providesTags: ["Tasks"],
    }),

    getTasksByUserId: builder.query<
      TGetTasksByUserIdResponse,
      IGetTasksByUserIdRequest
    >({
      query: (body) => ({
        url: `tasks?userId=${body.userId}`,
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
      query: (id) => ({
        url: `tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useGetTasksByUserIdQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
