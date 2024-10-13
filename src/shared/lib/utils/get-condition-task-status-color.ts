import { taskStatuses } from "shared/consts/task-statuses";

export const getConditionTaskStatusColor = (status: string) => {
  switch (status) {
    case taskStatuses.completed:
      return "var(--completed-task-color)";
    case taskStatuses.inProgress:
      return "var(--in-progress-task-color)";
    case taskStatuses.notStarted:
      return "var(--not-started-task-color)";
    default:
      return "var(--not-started-task-color)";
  }
};
