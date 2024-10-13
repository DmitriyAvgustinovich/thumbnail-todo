import { taskFieldsDataIndexes, taskFieldsPlaceholders } from "shared/consts/task-list-fields";

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
    return taskFieldsPlaceholders.priority;
  } else if (placeholder === taskFieldsDataIndexes.status) {
    return taskFieldsPlaceholders.status;
  } else if (placeholder === taskFieldsDataIndexes.deadline) {
    return taskFieldsPlaceholders.deadline;
  }
};
