import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteColumnRequest,
  IGetColumnsByProjectIdRequest,
  IUpdateColumnRequest,
  TAddColumnRequest,
  TAddColumnResponse,
  TDeleteColumnResponse,
  IGetColumnByIdRequest,
  TGetColumnByIdResponse,
  TGetColumnsByProjectIdResponse,
  TUpdateColumnResponse,
  TDeleteColumnsByProjectIdResponse,
  IDeleteColumnsByProjectIdRequest,
} from "./types";
import { commentsApi } from "../comments/comments-api";
import { tasksApi } from "../tasks/tasks-api";

export const columnsApi = createApi({
  reducerPath: "columnsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Columns"],
  endpoints: (builder) => ({
    getColumnsByProjectId: builder.query<
      TGetColumnsByProjectIdResponse,
      IGetColumnsByProjectIdRequest
    >({
      query: (body) => `columns?projectId=${body.projectId}`,
      providesTags: ["Columns"],
    }),

    getColumnById: builder.query<TGetColumnByIdResponse, IGetColumnByIdRequest>(
      {
        query: (body) => `columns/${body.id}`,
        providesTags: ["Columns"],
      }
    ),

    addColumn: builder.mutation<TAddColumnResponse, TAddColumnRequest>({
      query: (body) => ({
        url: "columns",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Columns"],
    }),

    updateColumn: builder.mutation<TUpdateColumnResponse, IUpdateColumnRequest>(
      {
        query: (body) => ({
          url: `columns/${body.id}`,
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Columns"],
      }
    ),

    deleteColumn: builder.mutation<TDeleteColumnResponse, IDeleteColumnRequest>(
      {
        query: (body) => ({
          url: `columns/${body.id}`,
          method: "DELETE",
        }),
        onQueryStarted: async (body, { dispatch }) => {
          try {
            dispatch(
              tasksApi.endpoints.deleteTasksByColumnId.initiate({
                columnId: body.id,
              })
            );

            dispatch(
              commentsApi.endpoints.deleteCommentsByColumnId.initiate({
                columnId: body.id,
              })
            );
          } catch (error) {
            console.log(error);
          }
        },
        invalidatesTags: ["Columns"],
      }
    ),

    deleteColumnsByProjectId: builder.mutation<
      TDeleteColumnsByProjectIdResponse,
      IDeleteColumnsByProjectIdRequest
    >({
      query: (body) => ({
        url: `columns?projectId=${body.projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Columns"],
    }),
  }),
});

export const {
  useGetColumnsByProjectIdQuery,
  useGetColumnByIdQuery,
  useAddColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = columnsApi;