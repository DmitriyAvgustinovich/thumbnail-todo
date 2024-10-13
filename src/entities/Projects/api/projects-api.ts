import { rtkApi } from "shared/api/rtk-api";
import { IProject } from "shared/types/IProject";

type TGetProjectsByAdminUserIdResponse = IProject[];
interface IGetProjectsByAdminUserIdRequest {
  adminUserId: string;
}

export const projectsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
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

export const { useGetProjectsByAdminUserIdQuery } = projectsApi;
