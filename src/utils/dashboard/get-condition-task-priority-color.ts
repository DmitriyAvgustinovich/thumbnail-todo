import { taskPriorities } from "constants/task/task-priorities";

export const getConditionTaskPriorityColor = (priority: string) => {
  switch (priority) {
    case taskPriorities.low:
      return "var(--low-priority-task-color)";
    case taskPriorities.medium:
      return "var(--moderate-priority-task-color)";
    case taskPriorities.high:
      return "var(--extreme-priority-task-color)";
    default:
      return "var(--low-priority-task-color)";
  }
};
