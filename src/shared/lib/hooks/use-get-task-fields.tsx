

import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
  DownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, Tooltip } from "antd";

import { DEFAULT_VALIDATE_MESSAGE } from "shared/consts/general";
import { taskFieldNodes } from "shared/consts/task-field-nodes";
import { useContexts } from "shared/lib/hooks/use-contexts";
import { getFieldsPlaceholder } from "shared/lib/utils/get-fields-placeholder";
import { getFieldsSelectOptions } from "shared/lib/utils/get-fields-select-options";
import { ITask } from "shared/types/ITask";

import { getFieldsDefaultValue } from "../utils/get-fields-default-value";
import { getFieldsLabel } from "../utils/get-fields-label";
import { getFieldsName } from "../utils/get-fields-name";

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
      })?.toString()}
      autoFocus={isEdit}
      size="large"
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
      })?.toString()}
      autoFocus={isEdit}
      size="large"
      onChange={onChangeMarkdownDescriptionValue}
      autoSize
    />
  );

  const SelectNode = (
    <Select
      options={getFieldsSelectOptions({ formField: taskFormElement })}
      placeholder={getFieldsPlaceholder({ placeholder: taskFormElement })}
      suffixIcon={
        taskFormElementIsLoadingState ? <LoadingOutlined /> : <DownOutlined />
      }
      defaultValue={getFieldsDefaultValue({
        defaultValue: taskFormElement,
        formValues,
      })?.toString()}
      size="large"
    />
  );

  const DateNode = (
    <DatePicker
      placeholder={getFieldsPlaceholder({ placeholder: taskFormElement })}
      suffixIcon={
        taskFormElementIsLoadingState ? (
          <LoadingOutlined />
        ) : (
          <CalendarOutlined />
        )
      }
      defaultValue={getFieldsDefaultValue({
        defaultValue: taskFormElement,
        formValues,
      })}
      size="large"
      style={{ width: "100%" }}
      allowClear={false}
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
    <Form.Item {...field} key={field.name} style={{ marginBottom: 0 }}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
