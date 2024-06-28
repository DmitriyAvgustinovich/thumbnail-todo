import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IDeleteProjectRequest,
  IGetProjectByIdRequest,
  IGetProjectsByAdminUserIdRequest,
  IUpdateProjectRequest,
  TAddProjectRequest,
  TAddProjectResponse,
  TDeleteProjectResponse,
  TGetAllProjectsRequest,
  TGetAllProjectsResponse,
  TGetProjectByIdResponse,
  TGetProjectsByAdminUserIdResponse,
  TUpdateProjectResponse,
} from "./types";

export const projectsApi = createApi({
  reducerPath: "projectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Projects"],
  endpoints: (build) => ({
    getAllProjects: build.query<
      TGetAllProjectsResponse,
      TGetAllProjectsRequest
    >({
      query: () => "projects",
      providesTags: ["Projects"],
    }),

    getProjectById: build.query<
      TGetProjectByIdResponse,
      IGetProjectByIdRequest
    >({
      query: (body) => `projects/${body.id}`,
      providesTags: ["Projects"],
    }),

    addProject: build.mutation<TAddProjectResponse, TAddProjectRequest>({
      query: (body) => ({
        url: "projects",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),

    updateProject: build.mutation<
      TUpdateProjectResponse,
      IUpdateProjectRequest
    >({
      query: (body) => ({
        url: `projects/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Projects"],
    }),

    deleteProject: build.mutation<
      TDeleteProjectResponse,
      IDeleteProjectRequest
    >({
      query: (body) => ({
        url: `projects/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),

    getProjectsByAdminUserId: build.query<
      TGetProjectsByAdminUserIdResponse,
      IGetProjectsByAdminUserIdRequest
    >({
      query: (body) => ({
        url: `projects?adminUserId=${body.adminUserId}`,
      }),
      providesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsByAdminUserIdQuery,
} = projectsApi;
