import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  IUserGetMeRequest,
  TUserGetMeResponse,
  IUserSignInRequest,
  TUserSignInResponse,
  TUserSignUpRequest,
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
    signUp: build.mutation<TUserSignUpResponse, TUserSignUpRequest>({
      query: (body) => ({
        url: "/users?sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userId", String(data.id));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    signIn: build.mutation<TUserSignInResponse, IUserSignInRequest>({
      query: (body) => ({
        url: "/user/sign-in",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("userId", String(data.id));
        } catch (error) {
          console.log(error);
        }
      },
    }),

    getMe: build.query<TUserGetMeResponse, IUserGetMeRequest>({
      query: (data) => ({
        url: `/users/${data.id ? data.id : "userNotInit"}`,
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
