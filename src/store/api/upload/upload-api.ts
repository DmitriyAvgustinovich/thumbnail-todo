import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { IUploadRequest, TUploadResponse } from "./types";

export const uploadApi = createApi({
  reducerPath: "uploadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Upload"],
  endpoints: (build) => ({
    upload: build.mutation<TUploadResponse, IUploadRequest>({
      query: (body) => ({
        url: "/upload-image",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["Upload"],
    }),
  }),
});

export const { useUploadMutation } = uploadApi;
