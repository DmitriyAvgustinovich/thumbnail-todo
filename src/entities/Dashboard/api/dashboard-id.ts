import { rtkApi } from "shared/api/rtk-api";
import { ITask } from "shared/types/ITask";

type TGetTasksByAssignedToUserIdResponse = ITask[];
interface IGetTasksByAssignedToUserIdRequest {
  id: string;
}

const dashboardApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getTasksByAssignedToUserId: build.query<
      TGetTasksByAssignedToUserIdResponse,
      IGetTasksByAssignedToUserIdRequest
    >({
      query: (body) => ({
        url: `tasks?assignedToUserId=${body.id}`,
      }),
      providesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksByAssignedToUserIdQuery } = dashboardApi;
