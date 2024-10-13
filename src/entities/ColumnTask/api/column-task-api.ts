import { rtkApi } from "shared/api/rtk-api";
import { IComment } from "shared/types/IComment";
import { IProjectContributor } from "shared/types/IProjectContributor";

type TGetCommentsByTaskIdResponse = IComment[];
interface IGetCommentsByTaskIdRequest {
  taskId: string;
}

type TGetProjectContributorsByProjectIdResponse = IProjectContributor[];
interface IGetProjectContributorsByProjectIdRequest {
  projectId: string;
}

export const columnTaskApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getCommentsByTaskId: build.query<
      TGetCommentsByTaskIdResponse,
      IGetCommentsByTaskIdRequest
    >({
      query: (body) => `comments?taskId=${body.taskId}`,
      providesTags: ["Comments"],
    }),

    getProjectContributorsByProjectId: build.query<
      TGetProjectContributorsByProjectIdResponse,
      IGetProjectContributorsByProjectIdRequest
    >({
      query: (body) => ({
        url: `projectContributors?projectId=${body.projectId}`,
      }),
      providesTags: ["ProjectContributors"],
    }),


  }),
});

export const {
  useGetCommentsByTaskIdQuery,
  useGetProjectContributorsByProjectIdQuery,
} = columnTaskApi;
