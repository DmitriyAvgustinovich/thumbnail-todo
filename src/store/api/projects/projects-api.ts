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
import { columnsApi } from "../columns/columns-api";
import { commentsApi } from "../comments/comments-api";
import { projectContributorsApi } from "../projectContributors/project-contributors-api";
import { tasksApi } from "../tasks/tasks-api";

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
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        try {
          const { data: projectData } = await queryFulfilled;

          const addedData = {
            id: projectData.id,
            projectId: projectData.id,
            userId: projectData?.adminUserId ?? "",
          };

          dispatch(
            projectContributorsApi.endpoints.addProjectContributor.initiate(
              addedData
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
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
      onQueryStarted: async (body, { dispatch }) => {
        try {
          dispatch(
            projectContributorsApi.endpoints.deleteProjectContributorsByProjectId.initiate(
              {
                projectId: body.id,
              }
            )
          );

          dispatch(
            columnsApi.endpoints.deleteColumnsByProjectId.initiate({
              projectId: body.id,
            })
          );

          dispatch(
            tasksApi.endpoints.deleteTasksByProjectId.initiate({
              projectId: body.id,
            })
          );

          dispatch(
            commentsApi.endpoints.deleteCommentsByProjectId.initiate({
              projectId: body.id,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
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
