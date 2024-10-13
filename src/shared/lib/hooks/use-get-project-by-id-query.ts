import { rtkApi } from "shared/api/rtk-api";
import { IProject } from "shared/types/IProject";

type TGetProjectByIdResponse = IProject;
interface IGetProjectByIdRequest {
  id?: string;
}

const getProjectByIdApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProjectById: build.query<
      TGetProjectByIdResponse,
      IGetProjectByIdRequest
    >({
      query: (body) => `projects/${body.id}`,
      providesTags: ["Projects"],
    }),
  }),
});

export const { useGetProjectByIdQuery } = getProjectByIdApi;
