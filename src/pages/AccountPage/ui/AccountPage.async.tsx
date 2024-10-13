import React from "react";

export const AccountPageAsync = React.lazy(() =>
  import("./AccountPage").then((module) => ({ default: module.default }))
);
