import { Navigate } from "react-router-dom";

import { RouterPath } from "configs/route-config";

interface IRequireAuthProps {
  children: React.ReactNode;
}

export function RequireAuth(props: IRequireAuthProps) {
  const { children } = props;

  const isUserDataLoading = false;
  const userData = null;

  if (!isUserDataLoading && !userData) {
    return <Navigate to={RouterPath.not_authorized} />;
  }

  return children;
}
