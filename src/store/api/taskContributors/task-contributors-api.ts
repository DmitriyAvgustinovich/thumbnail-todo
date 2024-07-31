import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteTaskContributorRequest,
  IGetTaskContributorsByTaskIdRequest,
  TAddTaskContributorRequest,
  TAddTaskContributorResponse,
  TDeleteTaskContributorResponse,
  TGetTaskContributorsByTaskIdResponse,
} from "./types";

export const taskContributorsApi = createApi({
  reducerPath: "taskContributorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["TaskContributors"],
  endpoints: (builder) => ({
    getTaskContributorsByTaskId: builder.query<
      TGetTaskContributorsByTaskIdResponse,
      IGetTaskContributorsByTaskIdRequest
    >({
      query: (body) => ({
        url: `taskContributors?taskId=${body.taskId}`,
      }),
      providesTags: ["TaskContributors"],
    }),

    addTaskContributor: builder.mutation<
      TAddTaskContributorResponse,
      TAddTaskContributorRequest
    >({
      query: (body) => ({
        url: "taskContributors",
        method: "POST",
        body,
      }),
      invalidatesTags: ["TaskContributors"],
    }),

    deleteTaskContributor: builder.mutation<
      TDeleteTaskContributorResponse,
      IDeleteTaskContributorRequest
    >({
      query: (body) => ({
        url: `taskContributors/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TaskContributors"],
    }),
  }),
});

export const {
  useGetTaskContributorsByTaskIdQuery,
  useAddTaskContributorMutation,
  useDeleteTaskContributorMutation,
} = taskContributorsApi;
