import { rtkApi } from "shared/api/rtk-api";
import { IUser } from "shared/types/IUser";

type TUserGetMeResponse = IUser;
interface IUserGetMeRequest {
  id: string;
}

const getMeApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getMe: build.query<TUserGetMeResponse, IUserGetMeRequest>({
      query: (data) => ({
        url: `/users/${data.id ? data.id : "userNotInit"}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
  }),
});

export const useGetAuthUser = () => {
  const userId = localStorage.getItem("userId") ?? "";

  const {
    data: authUser,
    isLoading: isAuthUserLoading,
    refetch: refetchAuthUser,
  } = getMeApi.useGetMeQuery({ id: userId });

  const isAuthUserInit = Object.keys(authUser ?? {}).length > 0;

  return { authUser, isAuthUserLoading, isAuthUserInit, refetchAuthUser };
};
