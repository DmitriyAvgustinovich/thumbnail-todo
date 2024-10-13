import React from "react";

import { TaskDataContext } from "app/providers/TaskDataProvider/lib/task-data-context";
import { TaskFormContext } from "app/providers/TaskFormProvider/lib/task-form-context";

export const useContexts = () => {
  const taskFormContext = React.useContext(TaskFormContext);
  const taskDataContext = React.useContext(TaskDataContext);

  return { taskFormContext, taskDataContext };
};
