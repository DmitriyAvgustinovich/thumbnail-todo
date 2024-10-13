import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";

interface IGetFieldsNameArgs {
  name: string;
}

export const getFieldsName = (args: IGetFieldsNameArgs) => {
  const { name } = args;

  if (name === taskFieldsDataIndexes.title) {
    return taskFieldsDataIndexes.title;
  } else if (name === taskFieldsDataIndexes.description) {
    return taskFieldsDataIndexes.description;
  } else if (name === taskFieldsDataIndexes.priority) {
    return taskFieldsDataIndexes.priority;
  } else if (name === taskFieldsDataIndexes.status) {
    return taskFieldsDataIndexes.status;
  } else if (name === taskFieldsDataIndexes.deadline) {
    return taskFieldsDataIndexes.deadline;
  }
};
