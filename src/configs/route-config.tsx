import { RouteProps } from "react-router-dom";

import { AuthPage } from "pages/AuthPage";
import { MainPage } from "pages/MainPage";
import { NotAuthorizedPage } from "pages/NotAuthorizedPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  MAIN = "main",
  NOT_AUTHORIZED = "not_authorized",
  AUTH = "auth",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: "/",
  [AppRoutes.NOT_AUTHORIZED]: "/not_authorized",
  [AppRoutes.AUTH]: "/auth",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.MAIN]: {
    path: RouterPath.main,
    authOnly: true,
    element: (
      <LazyLoadChunk>
        <MainPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.NOT_AUTHORIZED]: {
    path: RouterPath.not_authorized,
    element: (
      <LazyLoadChunk>
        <NotAuthorizedPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.AUTH]: {
    path: RouterPath.auth,
    element: (
      <LazyLoadChunk>
        <AuthPage />
      </LazyLoadChunk>
    ),
  },
};
