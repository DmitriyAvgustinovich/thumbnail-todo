import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rtkApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: [
    "Comments",
    "Projects",
    "Columns",
    "Auth",
    "Users",
    "Tasks",
    "TaskContributors",
    "ProjectContributors",
    "Notifications",
  ],
  endpoints: () => ({}),
});
