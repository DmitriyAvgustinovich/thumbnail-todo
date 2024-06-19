import { useGetMeQuery } from "store/api/auth/auth-api";

export const useGetAuthUser = () => {
  const userId = localStorage.getItem("userId") ?? "";
  const { data: authUser } = useGetMeQuery({ id: userId });

  return { authUser };
};
