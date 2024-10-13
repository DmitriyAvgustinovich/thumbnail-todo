import { rtkApi } from "shared/api/rtk-api";
import { IProject } from "shared/types/IProject";

type TUpdateProjectResponse = IProject;
interface IUpdateProjectRequest extends IProject {
  id: string;
}

const editProjectApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const { useUpdateProjectMutation } = editProjectApi;
