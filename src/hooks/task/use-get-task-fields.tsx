import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";
import { taskFieldNodes } from "constants/task/task-field-nodes";

import { useContexts } from "hooks/general/use-contexts";

import { getFieldsDefaultValue } from "utils/task/get-fields-default-value";
import { getFieldsLabel } from "utils/task/get-fields-label";
import { getFieldsName } from "utils/task/get-fields-name";
import { getFieldsPlaceholder } from "utils/task/get-fields-placeholder";
import { getFieldsSelectOptions } from "utils/task/get-fields-select-options";

import { ITask } from "types/ITask";

interface IUseGetTaskFieldsArgs {
  formValues?: ITask;
  taskFormElementHandleCloseEditForm?: () => void;
  taskFormElementIsLoadingState?: boolean;
  taskFormElementNode: string;
  taskFormElement: string;
  isEdit: boolean;
}

export const useGetTaskFields = (args: IUseGetTaskFieldsArgs) => {
  const {
    formValues,
    taskFormElementHandleCloseEditForm,
    taskFormElementIsLoadingState,
    taskFormElementNode,
    taskFormElement,
    isEdit,
  } = args;

  const isRequired = isEdit ? false : true;

  const {
    taskFormContext: {
      markdownDescriptionValue,
      onChangeMarkdownDescriptionValue,
    },
  } = useContexts();

  const InputNode = (
    <Input
      placeholder={getFieldsPlaceholder({ placeholder: taskFormElement })}
      defaultValue={getFieldsDefaultValue({
        defaultValue: taskFormElement,
        formValues,
      })}
      style={{ maxWidth: "225px" }}
      autoFocus={isEdit}
      suffix={
        isEdit && (
          <>
            <Tooltip title="Done">
              <Button
                type="primary"
                htmlType="submit"
                loading={taskFormElementIsLoadingState}
                icon={<CheckOutlined />}
                size="small"
              />
            </Tooltip>

            <Tooltip title="Cancel">
              <Button
                onClick={taskFormElementHandleCloseEditForm}
                icon={<CloseOutlined />}
                size="small"
              />
            </Tooltip>
          </>
        )
      }
    />
  );

  const TextareaNode = (
    <Input.TextArea
      placeholder={getFieldsPlaceholder({ placeholder: taskFormElement })}
      value={markdownDescriptionValue}
      defaultValue={getFieldsDefaultValue({
        defaultValue: taskFormElement,
        formValues,
      })}
      onChange={onChangeMarkdownDescriptionValue}
      autoSize
    />
  );

  const SelectNode = (
    <Select
      options={getFieldsSelectOptions({ formField: taskFormElement })}
      style={{ maxWidth: "150px" }}
      placeholder={getFieldsPlaceholder({ placeholder: taskFormElement })}
      defaultValue={getFieldsDefaultValue({
        defaultValue: taskFormElement,
        formValues,
      })}
    />
  );

  const DateNode = (
    <DatePicker
      style={{ width: "100%" }}
      placeholder={getFieldsPlaceholder({ placeholder: taskFormElement })}
      defaultValue={getFieldsDefaultValue({
        defaultValue: taskFormElement,
        formValues,
      })}
    />
  );

  const getFieldsNode = (inputNode: string) => {
    if (inputNode === taskFieldNodes.input) {
      return InputNode;
    } else if (inputNode === taskFieldNodes.textarea) {
      return TextareaNode;
    } else if (inputNode === taskFieldNodes.select) {
      return SelectNode;
    } else if (inputNode === taskFieldNodes.date) {
      return DateNode;
    }
  };

  const taskTitleFieldArray = [
    {
      label: getFieldsLabel({ label: taskFormElement, isEdit }),
      name: getFieldsName({ name: taskFormElement }),
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} task title`,
        },
      ],
      node: getFieldsNode(taskFormElementNode),
    },
  ];

  const FormFields = taskTitleFieldArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
