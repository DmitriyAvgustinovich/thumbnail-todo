import React from "react";

export const DashboardPageAsync = React.lazy(() =>
  import("./DashboardPage").then((module) => ({ default: module.default }))
);
