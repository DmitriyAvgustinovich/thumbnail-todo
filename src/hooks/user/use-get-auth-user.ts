import { useGetMeQuery } from "store/api/auth/auth-api";

export const useGetAuthUser = () => {
  const userId = localStorage.getItem("userId") ?? "";

  const {
    data: authUser,
    isLoading: isAuthUserLoading,
    refetch: refetchAuthUser,
  } = useGetMeQuery({ id: userId });

  const isAuthUserInit = Object.keys(authUser ?? {}).length > 0;

  return { authUser, isAuthUserLoading, isAuthUserInit, refetchAuthUser };
};
