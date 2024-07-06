import { AppRouter } from "components/AppRouter/AppRouter";
import { Navbar } from "components/Navbar/Navbar";
import { NavbarSkeleton } from "components/Navbar/NavbarSkeleton/NavbarSkeleton";

import { AppProviders } from "providers/AppProviders";

import { RouterPath } from "configs/route-config";

import { useNavigateSpecifiedPage } from "hooks/general/use-navigate-on-specified-page";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

export const App = () => {
  const { isAuthUserLoading, isAuthUserInit } = useGetAuthUser();

  const location = window.location.pathname;
  const isAuthPage = location === RouterPath.auth;

  useNavigateSpecifiedPage({
    isQuerySuccess: location === "/",
    pageString: RouterPath.dashboard,
  });

  return (
    <AppProviders>
      {isAuthUserLoading && !isAuthPage && <NavbarSkeleton />}
      {isAuthUserInit && !isAuthPage && <Navbar />}
      <AppRouter />
    </AppProviders>
  );
};
