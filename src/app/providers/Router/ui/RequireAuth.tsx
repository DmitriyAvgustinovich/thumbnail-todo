import { Navigate } from "react-router-dom";

import { RouterPath } from "shared/config/route-config";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";

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
