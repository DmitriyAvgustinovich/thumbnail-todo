import { rtkApi } from "shared/api/rtk-api";

type TDeleteProjectResponse = void;
interface IDeleteProjectRequest {
  id: string;
}

const projectBoardApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
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
  }),
});

export const { useDeleteProjectMutation } = projectBoardApi;
