import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IGetNotificationsByProjectIdRequest,
  TAddNotificationRequest,
  TAddNotificationResponse,
  TGetNotificationsByProjectIdResponse,
  TDeleteNotificationResponse,
  IDeleteNotificationRequest,
} from "./types";

export const notificationsApi = createApi({
  reducerPath: "notificationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Notifications"],
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
