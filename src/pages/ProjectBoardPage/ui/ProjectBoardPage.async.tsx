import React from "react";

export const ProjectBoardPageAsync = React.lazy(() =>
  import("./ProjectBoardPage").then((module) => ({ default: module.default }))
);
