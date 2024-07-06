import { RouteProps } from "react-router-dom";

import { AccountPage } from "pages/AccountPage";
import { AuthPage } from "pages/AuthPage";
import { DashboardPage } from "pages/DashboardPage";
import { NotAuthorizedPage } from "pages/NotAuthorizedPage";
import { ProjectBoardPage } from "pages/ProjectBoardPage";
import { ProjectsPage } from "pages/ProjectsPage";
import { VitalTaskPage } from "pages/VitalTaskPage";

import { LazyLoadChunk } from "components/LazyLoadChunk/LazyLoadChunk";

export type TAppRouteProps = RouteProps & {
  authOnly?: boolean;
  element: JSX.Element;
};

export enum AppRoutes {
  DASHBOARD = "dashboard",
  NOT_AUTHORIZED = "not_authorized",
  AUTH = "auth",
  VITAL_TASK = "vital_task",
  ACCOUNT = "account",
  PROJECTS = "projects",
  PROJECT_BOARD = "project_board",
}

export const RouterPath: Record<AppRoutes, string> = {
  [AppRoutes.DASHBOARD]: "/dashboard",
  [AppRoutes.NOT_AUTHORIZED]: "/not_authorized",
  [AppRoutes.AUTH]: "/auth",
  [AppRoutes.VITAL_TASK]: "/vital_task",
  [AppRoutes.ACCOUNT]: "/account",
  [AppRoutes.PROJECTS]: "/projects",
  [AppRoutes.PROJECT_BOARD]: "/projects/:id",
};

export const routeConfig: Record<AppRoutes, TAppRouteProps> = {
  [AppRoutes.DASHBOARD]: {
    path: RouterPath.dashboard,
    authOnly: true,
    element: (
      <LazyLoadChunk>
        <DashboardPage />
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
  [AppRoutes.VITAL_TASK]: {
    path: RouterPath.vital_task,
    authOnly: true,
    element: (
      <LazyLoadChunk>
        <VitalTaskPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.ACCOUNT]: {
    path: RouterPath.account,
    authOnly: true,
    element: (
      <LazyLoadChunk>
        <AccountPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.PROJECTS]: {
    path: RouterPath.projects,
    authOnly: true,
    element: (
      <LazyLoadChunk>
        <ProjectsPage />
      </LazyLoadChunk>
    ),
  },
  [AppRoutes.PROJECT_BOARD]: {
    path: RouterPath.project_board,
    authOnly: true,
    element: (
      <LazyLoadChunk>
        <ProjectBoardPage />
      </LazyLoadChunk>
    ),
  },
};
