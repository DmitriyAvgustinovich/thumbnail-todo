import {
  taskFieldsDataIndexes,
  taskFieldsPlaceholders,
} from "constants/task/task-list-fields";

interface IGetFieldsPlaceholderArgs {
  placeholder: string;
}

export const getFieldsPlaceholder = (args: IGetFieldsPlaceholderArgs) => {
  const { placeholder } = args;

  if (placeholder === taskFieldsDataIndexes.title) {
    return taskFieldsPlaceholders.title;
  } else if (placeholder === taskFieldsDataIndexes.description) {
    return taskFieldsPlaceholders.description;
  } else if (placeholder === taskFieldsDataIndexes.priority) {
    return taskFieldsDataIndexes.priority;
  } else if (placeholder === taskFieldsDataIndexes.status) {
    return taskFieldsDataIndexes.status;
  } else if (placeholder === taskFieldsDataIndexes.deadline) {
    return taskFieldsDataIndexes.deadline;
  }
};
