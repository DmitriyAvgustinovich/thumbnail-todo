import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

interface IRequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth(props: IRequireAuthProps) {
  const { children } = props;

  const { authUser, isAuthUserLoading } = useGetAuthUser();

  if (!isAuthUserLoading && !authUser) {
    return <Navigate to={RouterPath.not_authorized} />;
  }

  return children;
}
