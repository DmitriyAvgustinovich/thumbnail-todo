import { AppRouter } from "components/AppRouter/AppRouter";
import { Navbar } from "components/Navbar/Navbar";
import { NavbarSkeleton } from "components/Navbar/NavbarSkeleton/NavbarSkeleton";

import { AntThemeConfig } from "configs/AntThemeConfig";
import { RouterPath } from "configs/route-config";

import { useNavigateSpecifiedPage } from "hooks/auth/use-navigate-on-specified-page";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

export const App = () => {
  const { authUser, isAuthUserLoading } = useGetAuthUser();

  const location = window.location.pathname;
  const isPageNotAuth = location !== RouterPath.auth;

  useNavigateSpecifiedPage({
    isQuerySuccess: location === "/",
    pageString: RouterPath.dashboard,
  });

  return (
    <AntThemeConfig>
      {isAuthUserLoading && isPageNotAuth && <NavbarSkeleton />}
      {authUser && isPageNotAuth && <Navbar />}
      <AppRouter />
    </AntThemeConfig>
  );
};
