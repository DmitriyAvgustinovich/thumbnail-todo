import { useGetTasksByUserIdQuery } from "store/api/tasks/tasks-api";

import { taskStatuses } from "constants/dashboard/task-statuses";

import { useGetAuthUser } from "hooks/user/use-get-auth-user";

export const useGetTaskStatuses = () => {
  const { authUser } = useGetAuthUser();

  const { data: myTasksData } = useGetTasksByUserIdQuery({
    userId: authUser?.id ?? "",
  });

  const totalTasksCount = myTasksData?.length ?? 0;

  const completedTasksCount =
    myTasksData?.filter((task) => task.status === taskStatuses.completed)
      .length ?? 0;

  const completedTasksPercentage =
    totalTasksCount > 0
      ? Math.round((completedTasksCount / totalTasksCount) * 100)
      : 0;

  const inProgressTasksCount =
    myTasksData?.filter((task) => task.status === taskStatuses.inProgress)
      .length ?? 0;

  const inProgressTasksPercentage =
    totalTasksCount > 0
      ? Math.round((inProgressTasksCount / totalTasksCount) * 100)
      : 0;

  const notStartedTasksCount =
    myTasksData?.filter((task) => task.status === taskStatuses.notStarted)
      .length ?? 0;

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
