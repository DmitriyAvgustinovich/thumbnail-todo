import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteProjectContributorRequest,
  IDeleteProjectContributorsByProjectIdRequest,
  IGetProjectContributorsByProjectIdRequest,
  TAddProjectContributorRequest,
  TAddProjectContributorResponse,
  TDeleteProjectContributorResponse,
  TDeleteProjectContributorsByProjectIdResponse,
  TGetProjectContributorsByProjectIdResponse,
} from "./types";

export const projectContributorsApi = createApi({
  reducerPath: "projectContributorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["ProjectContributors"],
  endpoints: (builder) => ({
    getProjectContributorsByProjectId: builder.query<
      TGetProjectContributorsByProjectIdResponse,
      IGetProjectContributorsByProjectIdRequest
    >({
      query: (body) => ({
        url: `projectContributors?projectId=${body.projectId}`,
      }),
      providesTags: ["ProjectContributors"],
    }),

    addProjectContributor: builder.mutation<
      TAddProjectContributorResponse,
      TAddProjectContributorRequest
    >({
      query: (body) => ({
        url: "projectContributors",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ProjectContributors"],
    }),

    deleteProjectContributor: builder.mutation<
      TDeleteProjectContributorResponse,
      IDeleteProjectContributorRequest
    >({
      query: (body) => ({
        url: `projectContributors/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectContributors"],
    }),

    deleteProjectContributorsByProjectId: builder.mutation<
      TDeleteProjectContributorsByProjectIdResponse,
      IDeleteProjectContributorsByProjectIdRequest
    >({
      query: (body) => ({
        url: `projectContributors?projectId=${body.projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ProjectContributors"],
    }),
  }),
});

export const {
  useGetProjectContributorsByProjectIdQuery,
  useAddProjectContributorMutation,
  useDeleteProjectContributorMutation,
  useDeleteProjectContributorsByProjectIdMutation,
} = projectContributorsApi;
