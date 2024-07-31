import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteCommentRequest,
  IDeleteCommentsByColumnIdRequest,
  IDeleteCommentsByProjectIdRequest,
  IDeleteCommentsByTaskIdRequest,
  IGetCommentsByTaskIdRequest,
  IUpdateCommentRequest,
  TAddCommentRequest,
  TAddCommentResponse,
  TDeleteCommentResponse,
  TDeleteCommentsByColumnIdResponse,
  TDeleteCommentsByProjectIdResponse,
  TDeleteCommentsByTaskIdResponse,
  TGetCommentsByTaskIdResponse,
  TUpdateCommentResponse,
} from "./types";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Comments"],
  endpoints: (build) => ({
    getCommentsByTaskId: build.query<
      TGetCommentsByTaskIdResponse,
      IGetCommentsByTaskIdRequest
    >({
      query: (body) => `comments?taskId=${body.taskId}`,
      providesTags: ["Comments"],
    }),

    addComment: build.mutation<TAddCommentResponse, TAddCommentRequest>({
      query: (body) => ({
        url: "comments",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),

    updateComment: build.mutation<
      TUpdateCommentResponse,
      IUpdateCommentRequest
    >({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Comments"],
    }),

    deleteComment: build.mutation<
      TDeleteCommentResponse,
      IDeleteCommentRequest
    >({
      query: (body) => ({
        url: `comments/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),

    deleteCommentsByTaskId: build.mutation<
      TDeleteCommentsByTaskIdResponse,
      IDeleteCommentsByTaskIdRequest
    >({
      query: (body) => ({
        url: `comments?taskId=${body.taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),

    deleteCommentsByColumnId: build.mutation<
      TDeleteCommentsByColumnIdResponse,
      IDeleteCommentsByColumnIdRequest
    >({
      query: (body) => ({
        url: `comments?columnId=${body.columnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),

    deleteCommentsByProjectId: build.mutation<
      TDeleteCommentsByProjectIdResponse,
      IDeleteCommentsByProjectIdRequest
    >({
      query: (body) => ({
        url: `comments?projectId=${body.projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const {
  useGetCommentsByTaskIdQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
