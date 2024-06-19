import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IUserGetMeRequest,
  IUserGetMeResponse,
  IUserSignInRequest,
  IUserSignInResponse,
  IUserSignUpRequest,
  IUserSignUpResponse,
} from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signUp: build.mutation<IUserSignUpResponse, IUserSignUpRequest>({
      query: (body) => ({
        url: "/auth/sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userId", data.id);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    signIn: build.mutation<IUserSignInResponse, IUserSignInRequest>({
      query: (body) => ({
        url: "/auth/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userId", data.id);
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getMe: build.query<IUserGetMeResponse, IUserGetMeRequest>({
      query: (data) => ({
        url: `/auth/get-me/${data.id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    signOut: build.mutation<void, void>({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem("userId");
        } catch (error) {
          console.log(error);
        }
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useGetMeQuery,
  useSignOutMutation,
} = authApi;
