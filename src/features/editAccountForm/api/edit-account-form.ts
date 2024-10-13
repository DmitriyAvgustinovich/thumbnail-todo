import { rtkApi } from "shared/api/rtk-api";
import { IUser } from "shared/types/IUser";

type TUpdateUserResponse = IUser;
interface IUpdateUserRequest extends IUser {
  id: string;
}

const editAccountFormApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateUser: build.mutation<TUpdateUserResponse, IUpdateUserRequest>({
      query: (body) => ({
        url: `users/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useUpdateUserMutation } = editAccountFormApi;
