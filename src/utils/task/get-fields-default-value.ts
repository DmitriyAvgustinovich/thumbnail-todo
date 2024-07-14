import dayjs from "dayjs";

import { taskFieldsDataIndexes } from "constants/task/task-list-fields";

import { ITask } from "types/ITask";

interface IGetFieldsDefaultValueArgs {
  defaultValue: string;
  formValues?: ITask;
}

export const getFieldsDefaultValue = (args: IGetFieldsDefaultValueArgs) => {
  const { defaultValue, formValues } = args;

  if (defaultValue === taskFieldsDataIndexes.title) {
    return formValues?.title;
  } else if (defaultValue === taskFieldsDataIndexes.description) {
    return formValues?.description;
  } else if (defaultValue === taskFieldsDataIndexes.priority) {
    return formValues?.priority;
  } else if (defaultValue === taskFieldsDataIndexes.status) {
    return formValues?.status;
  } else if (defaultValue === taskFieldsDataIndexes.deadline) {
    return dayjs(formValues?.deadline);
  }
};
