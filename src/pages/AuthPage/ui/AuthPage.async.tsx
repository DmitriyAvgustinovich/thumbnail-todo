import React from "react";

export const AuthPageAsync = React.lazy(() =>
  import("./AuthPage").then((module) => ({ default: module.default }))
);
