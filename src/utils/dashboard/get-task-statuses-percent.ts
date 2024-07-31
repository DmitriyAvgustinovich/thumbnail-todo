import { taskStatuses } from "constants/task/task-statuses";

import { ITask } from "types/ITask";

interface IGetTaskStatusesPercentArgs {
  assignedToMeTasksData: ITask[]
}

export const getTaskStatusesPercent = (args: IGetTaskStatusesPercentArgs) => {
  const { assignedToMeTasksData } = args;

  const totalTasksCount = assignedToMeTasksData?.length ?? 0;

  const completedTasksCount =
    assignedToMeTasksData?.filter(
      (task) => task.status === taskStatuses.completed
    ).length ?? 0;

  const completedTasksPercentage =
    totalTasksCount > 0
      ? Math.round((completedTasksCount / totalTasksCount) * 100)
      : 0;

  const inProgressTasksCount =
    assignedToMeTasksData?.filter(
      (task) => task.status === taskStatuses.inProgress
    ).length ?? 0;

  const inProgressTasksPercentage =
    totalTasksCount > 0
      ? Math.round((inProgressTasksCount / totalTasksCount) * 100)
      : 0;

  const notStartedTasksCount =
    assignedToMeTasksData?.filter(
      (task) => task.status === taskStatuses.notStarted
    ).length ?? 0;

  const notStartedTasksPercentage =
    totalTasksCount > 0
      ? Math.round((notStartedTasksCount / totalTasksCount) * 100)
      : 0;

  return {
    completedTasksPercentage,
    inProgressTasksPercentage,
    notStartedTasksPercentage,
  };
};
