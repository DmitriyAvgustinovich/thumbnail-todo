import React from "react";

export const NotAuthorizedPageAsync = React.lazy(() =>
  import("./NotAuthorizedPage").then((module) => ({ default: module.default }))
);
