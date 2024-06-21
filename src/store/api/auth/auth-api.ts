import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IUserGetMeRequest,
  TUserGetMeResponse,
  TUserSignInRequest,
  TUserSignInResponse,
  IUserSignUpRequest,
  TUserSignUpResponse,
} from "./types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    signUp: build.mutation<TUserSignUpResponse, IUserSignUpRequest>({
      query: (body) => ({
        url: "/users?sign-up",
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

    signIn: build.mutation<TUserSignInResponse, TUserSignInRequest>({
      query: (body) => ({
        url: "/user/sign-in",
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

    getMe: build.query<TUserGetMeResponse, IUserGetMeRequest>({
      query: (data) => ({
        url: `/users/${data.id ? data.id : "notInitUser"}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),

    signOut: build.mutation<void, void>({
      query: () => ({
        url: "/user/sign-out",
        method: "POST",
      }),
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
