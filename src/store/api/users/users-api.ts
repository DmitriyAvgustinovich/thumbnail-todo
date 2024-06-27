import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import {
  TUserGetAllUsersRequest,
  IUserGetUserByIdRequest,
  TUseGetAllUsersResponse,
  TUseGetUserByIdResponse,
  TUpdateUserResponse,
  IUpdateUserRequest,
  TDeleteUserResponse,
  IDeleteUserRequest,
} from "./types";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    getAllUsers: build.query<TUseGetAllUsersResponse, TUserGetAllUsersRequest>({
      query: () => "users",
      providesTags: ["Users"],
    }),

    getUserById: build.query<TUseGetUserByIdResponse, IUserGetUserByIdRequest>({
      query: (id) => `users/${id}`,
      providesTags: ["Users"],
    }),

    updateUser: build.mutation<TUpdateUserResponse, IUpdateUserRequest>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: build.mutation<TDeleteUserResponse, IDeleteUserRequest>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
