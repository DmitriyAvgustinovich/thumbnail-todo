import { rtkApi } from "shared/api/rtk-api";
import { ITaskContributor } from "shared/types/ITaskContributor";

type TAddTaskContributorResponse = ITaskContributor;
type TAddTaskContributorRequest = ITaskContributor;

const addTaskContributorApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addTaskContributor: build.mutation<
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
  }),
});

export const { useAddTaskContributorMutation } = addTaskContributorApi;
