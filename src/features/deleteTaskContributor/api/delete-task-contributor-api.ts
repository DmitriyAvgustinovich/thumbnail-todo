import { rtkApi } from "shared/api/rtk-api";

type TDeleteTaskContributorResponse = void;
interface IDeleteTaskContributorRequest {
  id: string;
}

const deleteTaskContributorApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    deleteTaskContributor: build.mutation<
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

export const { useDeleteTaskContributorMutation } = deleteTaskContributorApi;
