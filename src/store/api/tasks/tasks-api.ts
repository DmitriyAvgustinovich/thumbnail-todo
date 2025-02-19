import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { getCurrentDate } from "shared/lib/utils/get-current-date";

import {
  IDeleteTaskRequest,
  IGetTaskByIdRequest,
  IGetTasksByAssignedToUserIdRequest,
  IUpdateTaskRequest,
  TAddTaskRequest,
  TAddTaskResponse,
  TDeleteTaskResponse,
  TGetTaskByIdResponse,
  TGetTasksByAssignedToUserIdResponse,
  TUpdateTaskResponse,
  TGetTasksByColumnIdResponse,
  IGetTasksByColumnIdRequest,
  TDeleteTasksByColumnIdResponse,
  IDeleteTasksByColumnIdRequest,
  TDeleteTasksByProjectIdResponse,
  IDeleteTasksByProjectIdRequest,
} from "./types";
import { commentsApi } from "../comments/comments-api";
import { notificationsApi } from "../notifications/notifications-api";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasksByAssignedToUserId: builder.query<
      TGetTasksByAssignedToUserIdResponse,
      IGetTasksByAssignedToUserIdRequest
    >({
      query: (body) => ({
        url: `tasks?assignedToUserId=${body.id}`,
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
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const { data: taskData } = await queryFulfilled;

        const addedData = {
          projectId: body.projectId,
          columnId: body.columnId,
          title: "Event on the project: ",
          message: `Task "${taskData.title}" was created in column: `,
          createdAt: getCurrentDate(),
        };

        try {
          dispatch(
            notificationsApi.endpoints.addNotification.initiate(addedData)
          );
        } catch (error) {
          console.log(error);
        }
      },
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
      onQueryStarted: async (body, { dispatch }) => {
        try {
          dispatch(
            commentsApi.endpoints.deleteCommentsByTaskId.initiate({
              taskId: body.id,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Tasks"],
    }),

    deleteTasksByColumnId: builder.mutation<
      TDeleteTasksByColumnIdResponse,
      IDeleteTasksByColumnIdRequest
    >({
      query: (body) => ({
        url: `tasks?columnId=${body.columnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTasksByProjectId: builder.mutation<
      TDeleteTasksByProjectIdResponse,
      IDeleteTasksByProjectIdRequest
    >({
      query: (body) => ({
        url: `tasks?projectId=${body.projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksByAssignedToUserIdQuery,
  useGetTasksByColumnIdQuery,
  useGetTaskByIdQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
