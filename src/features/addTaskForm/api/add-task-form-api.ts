import { rtkApi } from "shared/api/rtk-api";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { ITask } from "shared/types/ITask";

import { notificationsApi } from "widgets/Notifications/api/notifications-api";

type TAddTaskResponse = ITask;
type TAddTaskRequest = ITask;

const addTaskFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addTask: build.mutation<TAddTaskResponse, TAddTaskRequest>({
      query: (body) => ({
        url: "tasks",
        method: "POST",
        body,
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const { data: taskData } = await queryFulfilled;

        const addedData = {
          projectId: body.projectId,
          columnId: body.columnId,
          title: "Event on the project: ",
          message: `Task "${taskData.title}" was created in column: `,
          createdAt: getCurrentDate(),
        };

        try {
          dispatch(
            notificationsApi.endpoints.addNotification.initiate(addedData)
          );
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useAddTaskMutation } = addTaskFormApi;
