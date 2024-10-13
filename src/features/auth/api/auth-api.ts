import { rtkApi } from "shared/api/rtk-api";
import { IUser } from "shared/types/IUser";

type TUserSignUpResponse = IUser;
type TUserSignUpRequest = IUser;

type TUserSignInResponse = IUser;
interface IUserSignInRequest {
  email: string;
  password: string;
}

const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    signUp: build.mutation<TUserSignUpResponse, TUserSignUpRequest>({
      query: (body) => ({
        url: "/users?sign-up",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Auth"],
      async onQueryStarted(body, { queryFulfilled }) {
        const { data: userData } = await queryFulfilled;

        try {
          localStorage.setItem("userId", String(userData.id));
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
      async onQueryStarted(body, { queryFulfilled }) {
        const { data: userData } = await queryFulfilled;

        try {
          localStorage.setItem("userId", String(userData.id));
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = authApi;
