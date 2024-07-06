import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const columnsApi = createApi({
  reducerPath: "columnsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Columns"],
  endpoints: (builder) => ({
    getColumnsByProjectId: builder.query({
      query: (body) => `columns?projectId=${body.projectId}`,
      providesTags: ["Columns"],
    }),

    addColumn: builder.mutation({
      query: (body) => ({
        url: "columns",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Columns"],
    }),

    updateColumn: builder.mutation({
      query: (body) => ({
        url: `columns/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Columns"],
    }),

    deleteColumn: builder.mutation({
      query: (body) => ({
        url: `columns/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Columns"],
    }),
  }),
});

export const {
  useGetColumnsByProjectIdQuery,
  useAddColumnMutation,
  useUpdateColumnMutation,
  useDeleteColumnMutation,
} = columnsApi;
