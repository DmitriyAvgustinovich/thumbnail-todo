import { rtkApi } from "shared/api/rtk-api";
import { IProject } from "shared/types/IProject";

import { addProjectContributorApi } from "./add-project-contributor-api";

type TAddProjectResponse = IProject;
type TAddProjectRequest = IProject;

const addProjectApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
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
            addProjectContributorApi.endpoints.addProjectContributor.initiate(
              addedData
            )
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const { useAddProjectMutation } = addProjectApi;
