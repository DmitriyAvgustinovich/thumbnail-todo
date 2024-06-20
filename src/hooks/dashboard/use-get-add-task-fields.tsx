import { Form, Input } from "antd";

import {
  addTaskFieldsDataIndexes,
  addTaskFieldsTitles,
  addTaskFieldsPlaceholders,
} from "constants/dashboard/add-task-list-fields";
import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";

export const useGetAddTaskFields = () => {
  const addTaskFieldsArray = [
    {
      label: addTaskFieldsTitles.title,
      name: addTaskFieldsDataIndexes.title,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} task title`,
        },
      ],
      node: <Input placeholder={addTaskFieldsPlaceholders.title} />,
    },
    {
      label: addTaskFieldsTitles.deadline,
      name: addTaskFieldsDataIndexes.deadline,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} deadline`,
        },
      ],
      node: <Input placeholder={addTaskFieldsPlaceholders.deadline} />,
    },
    {
      label: addTaskFieldsTitles.priority,
      name: addTaskFieldsDataIndexes.priority,
      rules: [
        {
          required: true,
          message: `${DEFAULT_VALIDATE_MESSAGE} priority`,
        },
      ],
      node: <Input placeholder={addTaskFieldsPlaceholders.priority} />,
    },
    {
      label: addTaskFieldsTitles.description,
      name: addTaskFieldsDataIndexes.description,
      rules: [
        {
          message: `${DEFAULT_VALIDATE_MESSAGE} description`,
        },
      ],
      node: <Input placeholder={addTaskFieldsPlaceholders.description} />,
    },
    {
      label: addTaskFieldsTitles.image,
      name: addTaskFieldsDataIndexes.image,
      rules: [
        {
          message: `${DEFAULT_VALIDATE_MESSAGE} image`,
        },
      ],
      node: <Input placeholder={addTaskFieldsPlaceholders.image} />,
    },
  ];

  const FormFields = addTaskFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
