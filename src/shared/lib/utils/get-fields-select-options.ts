import { taskFieldsDataIndexes } from "shared/consts/task-list-fields";
import { taskPrioritiesOptions } from "shared/consts/task-priorities";
import { taskStatusesOptions } from "shared/consts/task-statuses";

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
