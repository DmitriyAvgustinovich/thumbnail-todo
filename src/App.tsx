import { AppRouter } from "components/AppRouter/AppRouter";
import { Navbar } from "components/Navbar/Navbar";
import { NavbarSkeleton } from "components/Navbar/NavbarSkeleton/NavbarSkeleton";

import { ImageUrlProvider } from "providers/ImageUrlProvider";

import { AntThemeConfig } from "configs/AntThemeConfig";
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
    <ImageUrlProvider>
      <AntThemeConfig>
        {isAuthUserLoading && !isAuthPage && <NavbarSkeleton />}
        {isAuthUserInit && !isAuthPage && <Navbar />}
        <AppRouter />
      </AntThemeConfig>
    </ImageUrlProvider>
  );
};
