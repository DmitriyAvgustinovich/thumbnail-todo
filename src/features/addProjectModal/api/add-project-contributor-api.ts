import { rtkApi } from "shared/api/rtk-api";
import { IProjectContributor } from "shared/types/IProjectContributor";

type TAddProjectContributorResponse = IProjectContributor;
type TAddProjectContributorRequest = IProjectContributor;

export const addProjectContributorApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addProjectContributor: build.mutation<
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
  }),
});

export const { useAddProjectContributorMutation } = addProjectContributorApi;
