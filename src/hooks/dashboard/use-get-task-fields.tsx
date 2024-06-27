import { DatePicker, Form, Input, Radio } from "antd";
import dayjs from "dayjs";

import {
  taskFieldsDataIndexes,
  taskFieldsTitles,
  taskFieldsPlaceholders,
} from "constants/dashboard/task-list-fields";
import { taskPriorities } from "constants/dashboard/task-priorities";
import { taskStatuses } from "constants/dashboard/task-statuses";
import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";

import { ITask } from "types/ITask";

interface IUseGetTaskFieldsArgs {
  formValues?: ITask;
  isEdit: boolean;
}

export const useGetTaskFields = (args: IUseGetTaskFieldsArgs) => {
  const { formValues, isEdit } = args;

  const isRequired = isEdit ? false : true;

  const taskFieldsArray = [
    {
      label: taskFieldsTitles.title,
      name: taskFieldsDataIndexes.title,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} task title`,
        },
      ],
      node: (
        <Input
          placeholder={taskFieldsPlaceholders.title}
          defaultValue={formValues?.title}
        />
      ),
    },
    {
      label: taskFieldsTitles.deadline,
      name: taskFieldsDataIndexes.deadline,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} deadline`,
        },
      ],
      node: (
        <DatePicker
          placeholder={taskFieldsPlaceholders.deadline}
          style={{ width: "100%" }}
          defaultValue={dayjs(formValues?.deadline)}
        />
      ),
    },
    {
      label: taskFieldsTitles.priority,
      name: taskFieldsDataIndexes.priority,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} priority`,
        },
      ],
      node: (
        <Radio.Group defaultValue={formValues?.priority}>
          <Radio value={taskPriorities.high}>{taskPriorities.high}</Radio>
          <Radio value={taskPriorities.medium}>{taskPriorities.medium}</Radio>
          <Radio value={taskPriorities.low}>{taskPriorities.low}</Radio>
        </Radio.Group>
      ),
    },
    {
      label: taskFieldsTitles.description,
      name: taskFieldsDataIndexes.description,
      node: (
        <Input.TextArea
          placeholder={taskFieldsPlaceholders.description}
          rows={4}
          defaultValue={formValues?.description}
        />
      ),
    },
    {
      label: taskFieldsTitles.image,
      name: taskFieldsDataIndexes.image,
      node: (
        <Input
          placeholder={taskFieldsPlaceholders.image}
          defaultValue={formValues?.image}
        />
      ),
    },
  ];

  if (isEdit) {
    taskFieldsArray.splice(3, 0, {
      label: taskFieldsTitles.status,
      name: taskFieldsDataIndexes.status,
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} status`,
        },
      ],
      node: (
        <Radio.Group defaultValue={formValues?.status}>
          <Radio value={taskStatuses.completed}>{taskStatuses.completed}</Radio>
          <Radio value={taskStatuses.inProgress}>
            {taskStatuses.inProgress}
          </Radio>
          <Radio value={taskStatuses.notStarted}>
            {taskStatuses.notStarted}
          </Radio>
        </Radio.Group>
      ),
    });
  }

  const FormFields = taskFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
