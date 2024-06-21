import {
  CheckOutlined,
  ClockCircleOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";
import { DatePicker, Form, Input, Radio } from "antd";

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
      node: (
        <DatePicker
          placeholder={addTaskFieldsPlaceholders.deadline}
          style={{ width: "100%" }}
        />
      ),
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
      node: (
        <Radio.Group>
          <Radio value="high">
            <ExclamationOutlined
              style={{ color: "var(--high-priority-task-color)" }}
            />
            High
          </Radio>

          <Radio value="medium">
            <ClockCircleOutlined
              style={{ color: "var(--medium-priority-task-color)" }}
            />{" "}
            Medium
          </Radio>

          <Radio value="low">
            <CheckOutlined
              style={{ color: "var(--low-priority-task-color)" }}
            />{" "}
            Low
          </Radio>
        </Radio.Group>
      ),
    },
    {
      label: addTaskFieldsTitles.description,
      name: addTaskFieldsDataIndexes.description,
      rules: [
        {
          message: `${DEFAULT_VALIDATE_MESSAGE} description`,
        },
      ],
      node: (
        <Input.TextArea
          placeholder={addTaskFieldsPlaceholders.description}
          rows={4}
        />
      ),
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
