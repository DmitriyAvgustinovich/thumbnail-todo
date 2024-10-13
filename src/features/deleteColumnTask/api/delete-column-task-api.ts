import { rtkApi } from "shared/api/rtk-api";
import { ITask } from "shared/types/ITask";

type TDeleteTaskResponse = ITask;
interface IDeleteTaskRequest {
  id: string;
  commentsIds?: string;
}

const deleteColumnTaskApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    deleteTask: build.mutation<TDeleteTaskResponse, IDeleteTaskRequest>({
      query: (body) => ({
        url: `tasks/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useDeleteTaskMutation } = deleteColumnTaskApi;
