import { rtkApi } from "shared/api/rtk-api";

type TSignOutResponse = void;
type ISignOutRequest = void;

const userMenuSidebarApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    signOut: build.mutation<TSignOutResponse, ISignOutRequest>({
      query: () => ({
        url: "/user/sign-out",
        method: "POST",
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useSignOutMutation } = userMenuSidebarApi;
