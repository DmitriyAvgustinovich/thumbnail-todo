import { taskFieldsDataIndexes, taskFieldsTitles } from "shared/consts/task-list-fields";

interface IGetFieldsLabelArgs {
  label: string;
  isEdit: boolean;
}

export const getFieldsLabel = (args: IGetFieldsLabelArgs) => {
  const { label, isEdit } = args;

  if (label === taskFieldsDataIndexes.title && !isEdit) {
    return taskFieldsTitles.title;
  } else if (label === taskFieldsTitles.description && !isEdit) {
    return taskFieldsTitles.description;
  } else if (label === taskFieldsDataIndexes.priority && !isEdit) {
    return taskFieldsTitles.priority;
  } else if (label === taskFieldsDataIndexes.status && !isEdit) {
    return taskFieldsTitles.status;
  } else if (label === taskFieldsDataIndexes.deadline && !isEdit) {
    return taskFieldsTitles.deadline;
  }
};
