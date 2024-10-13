import { rtkApi } from "shared/api/rtk-api";
import { INotification } from "shared/types/INotification";

type TGetNotificationsByProjectIdResponse = INotification[];
interface IGetNotificationsByProjectIdRequest {
  projectId: string;
}

type TAddNotificationResponse = INotification;
type TAddNotificationRequest = INotification;

type TDeleteNotificationResponse = void;
interface IDeleteNotificationRequest {
  id: string;
}

export const notificationsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationsByProjectId: build.query<
      TGetNotificationsByProjectIdResponse,
      IGetNotificationsByProjectIdRequest
    >({
      query: (body) => `notifications?projectId=${body.projectId}`,
      providesTags: ["Notifications"],
    }),

    addNotification: build.mutation<
      TAddNotificationResponse,
      TAddNotificationRequest
    >({
      query: (body) => ({
        url: "notifications",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Notifications"],
    }),

    deleteNotification: build.mutation<
      TDeleteNotificationResponse,
      IDeleteNotificationRequest
    >({
      query: (body) => ({
        url: `notifications/${body.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationsByProjectIdQuery,
  useAddNotificationMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
