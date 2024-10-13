import React from "react";

import { Routes, Route } from "react-router-dom";

import { TAppRouteProps, routeConfig } from "shared/config/route-config";

import { RequireAuth } from "./RequireAuth";

export const AppRouter = () => {
  const renderWithWrapper = React.useCallback((route: TAppRouteProps) => {
    const element = (
      <React.Suspense fallback="">{route.element}</React.Suspense>
    );

    return (
      <Route
        key={route.path}
        path={route.path}
        element={
          route.authOnly ? <RequireAuth>{element}</RequireAuth> : element
        }
      />
    );
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};
