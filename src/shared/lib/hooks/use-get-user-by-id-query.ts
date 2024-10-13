import { rtkApi } from "shared/api/rtk-api";
import { IUser } from "shared/types/IUser";

type TUseGetUserByIdResponse = IUser;
interface IUserGetUserByIdRequest {
  id: string;
}

const getUserByIdApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUserById: build.query<TUseGetUserByIdResponse, IUserGetUserByIdRequest>({
      query: (body) => `users/${body.id}`,
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUserByIdQuery } = getUserByIdApi;
