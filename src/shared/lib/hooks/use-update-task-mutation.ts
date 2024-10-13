import { rtkApi } from "shared/api/rtk-api";
import { ITask } from "shared/types/ITask";

type TUpdateTaskResponse = ITask;
interface IUpdateTaskRequest {
  id: string;
  assignedToUserId?: string;
}

const updateTaskApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateTask: build.mutation<TUpdateTaskResponse, IUpdateTaskRequest>({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useUpdateTaskMutation } = updateTaskApi;
