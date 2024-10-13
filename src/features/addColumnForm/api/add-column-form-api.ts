import { rtkApi } from "shared/api/rtk-api";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { IColumn } from "shared/types/IColumn";

import { notificationsApi } from "widgets/Notifications/api/notifications-api";

type TAddColumnResponse = IColumn;
type TAddColumnRequest = IColumn;

const addColumnFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    addColumn: build.mutation<TAddColumnResponse, TAddColumnRequest>({
      query: (body) => ({
        url: "columns",
        method: "POST",
        body,
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const { data: columnData } = await queryFulfilled;

        const addedData = {
          projectId: body.projectId,
          title: "Event on the project: ",
          message: `Column "${columnData.title}" was created.`,
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
      invalidatesTags: ["Columns"],
    }),
  }),
});

export const { useAddColumnMutation } = addColumnFormApi;
