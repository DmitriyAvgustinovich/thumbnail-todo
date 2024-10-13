import React from "react";

export const ProjectsPageAsync = React.lazy(() =>
  import("./ProjectsPage").then((module) => ({ default: module.default }))
);
