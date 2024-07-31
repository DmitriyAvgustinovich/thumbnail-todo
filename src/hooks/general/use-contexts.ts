import React from "react";

import { TaskFormContext } from "providers/TaskFormProvider";

export const useContexts = () => {
  const taskFormContext = React.useContext(TaskFormContext);

  return { taskFormContext };
};
