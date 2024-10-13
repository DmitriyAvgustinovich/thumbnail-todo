import { RouteProps } from "react-router-dom";

import { AccountPage } from "pages/AccountPage";
import { AuthPage } from "pages/AuthPage";
import { DashboardPage } from "pages/DashboardPage";
import { NotAuthorizedPage } from "pages/NotAuthorizedPage";
import { ProjectBoardPage } from "pages/ProjectBoardPage";
import { ProjectsPage } from "pages/ProjectsPage";

export type TAppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  DASHBOARD = "dashboard",
  NOT_AUTHORIZED = "not_authorized",
  AUTH = "auth",
  ACCOUNT = "account",
  PROJECTS = "projects",
  PROJECT_BOARD = "project_board",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.DASHBOARD]: "/dashboard",
  [AppRoutes.NOT_AUTHORIZED]: "/not_authorized",
  [AppRoutes.AUTH]: "/auth",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.PROJECTS]: "/projects",
  [AppRoutes.PROJECT_BOARD]: "/projects/:id",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.DASHBOARD]: {
    path: RouterPath.dashboard,
    authOnly: true,
    element: <DashboardPage />,
  },
  [AppRoutes.NOT_AUTHORIZED]: {
    path: RouterPath.not_authorized,
    element: <NotAuthorizedPage />,
  },
  [AppRoutes.AUTH]: {
    path: RouterPath.auth,
    element: <AuthPage />,
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    authOnly: true,
    element: <AccountPage />,
  },
  [AppRoutes.PROJECTS]: {
    path: RouterPath.projects,
    authOnly: true,
    element: <ProjectsPage />,
  },
  [AppRoutes.PROJECT_BOARD]: {
    path: RouterPath.project_board,
    authOnly: true,
    element: <ProjectBoardPage />,
  },
};
