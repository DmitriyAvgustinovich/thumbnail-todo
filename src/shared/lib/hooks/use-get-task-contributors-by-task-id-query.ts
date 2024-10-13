import { rtkApi } from "shared/api/rtk-api";
import { ITaskContributor } from "shared/types/ITaskContributor";

type TGetTaskContributorsByTaskIdResponse = ITaskContributor[];
interface IGetTaskContributorsByTaskIdRequest {
  taskId: string;
}

const getTaskContributorsByTaskIdQueryApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getTaskContributorsByTaskId: build.query<
      TGetTaskContributorsByTaskIdResponse,
      IGetTaskContributorsByTaskIdRequest
    >({
      query: (body) => ({
        url: `taskContributors?taskId=${body.taskId}`,
      }),
      providesTags: ["TaskContributors"],
    }),
  }),
});

export const { useGetTaskContributorsByTaskIdQuery } =
  getTaskContributorsByTaskIdQueryApi;
