import { taskFieldsDataIndexes } from "constants/task/task-list-fields";
import { taskPrioritiesOptions } from "constants/task/task-priorities";
import { taskStatusesOptions } from "constants/task/task-statuses";

interface IGetFieldsSelectOptionsArgs {
  formField: string;
}

export const getFieldsSelectOptions = (args: IGetFieldsSelectOptionsArgs) => {
  const { formField } = args;

  if (formField === taskFieldsDataIndexes.priority) {
    return taskPrioritiesOptions;
  } else if (formField === taskFieldsDataIndexes.status) {
    return taskStatusesOptions;
  }
};
