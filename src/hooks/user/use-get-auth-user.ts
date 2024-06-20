import { useGetMeQuery } from "store/api/auth/auth-api";

export const useGetAuthUser = () => {
  const userId = localStorage.getItem("userId") ?? "";

  const { data: authUser, isLoading: isAuthUserLoading } = useGetMeQuery({
    id: userId,
  });

  return { authUser, isAuthUserLoading };
};
