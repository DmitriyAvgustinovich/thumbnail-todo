import React from "react";

import { RouterPath } from "shared/config/route-config";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { useNavigateSpecifiedPage } from "shared/lib/hooks/use-navigate-on-specified-page";

import { Navbar } from "widgets/Navbar";
import { NavbarSkeleton } from "widgets/Navbar/ui/NavbarSkeleton/NavbarSkeleton";

import { AppRouter } from "./providers/Router";

export const App = () => {
  const { isAuthUserLoading, isAuthUserInit } = useGetAuthUser();

  const location = window.location.pathname;
  const isAuthPage = location === RouterPath.auth;

  useNavigateSpecifiedPage({
    isQuerySuccess: location === "/",
    pageString: RouterPath.dashboard,
  });

  return (
    <React.Suspense fallback={""}>
      {isAuthUserLoading && !isAuthPage && <NavbarSkeleton />}
      {isAuthUserInit && !isAuthPage && <Navbar />}
      <AppRouter />
    </React.Suspense>
  );
};
