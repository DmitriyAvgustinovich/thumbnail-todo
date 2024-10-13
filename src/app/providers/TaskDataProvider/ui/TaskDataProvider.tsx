import { ITask } from "shared/types/ITask";

import { TaskDataContext } from "../lib/task-data-context";

interface ITaskDataProviderProps {
  taskData: ITask;
  children: React.ReactNode;
}

export const TaskDataProvider = (props: ITaskDataProviderProps) => {
  const { taskData, children } = props;

  return (
    <TaskDataContext.Provider value={taskData}>
      {children}
    </TaskDataContext.Provider>
  );
};
