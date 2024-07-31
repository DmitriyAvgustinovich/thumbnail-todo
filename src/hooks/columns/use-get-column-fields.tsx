import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Form, Input, Tooltip } from "antd";

import {
  columnFieldsDataIndexes,
  columnFieldsPlaceholders,
  columnFieldsTitles,
} from "constants/column/column-list-fields";
import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";

import { IColumn } from "types/IColumn";

interface IUseGetColumnFieldsArgs {
  formValues?: IColumn;
  isEdit: boolean;
  isLoadingState?: boolean;
  handleCloseEditForm?: () => void;
}

export const useGetColumnFields = (args: IUseGetColumnFieldsArgs) => {
  const { formValues, isEdit, isLoadingState, handleCloseEditForm } = args;

  const isRequired = isEdit ? false : true;

  const columnFieldsArray = [
    {
      label: !isEdit ? columnFieldsTitles.title : "",
      name: columnFieldsDataIndexes.title,
      node: (
        <Input
          placeholder={columnFieldsPlaceholders.title}
          defaultValue={formValues?.title}
          style={{ maxWidth: "180px" }}
          suffix={
            isEdit && (
              <>
                <Tooltip title="Done">
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoadingState}
                    icon={<CheckOutlined />}
                    size="small"
                  />
                </Tooltip>

                <Tooltip title="Cancel">
                  <Button
                    onClick={handleCloseEditForm}
                    icon={<CloseOutlined />}
                    size="small"
                  />
                </Tooltip>
              </>
            )
          }
        />
      ),
      rules: [
        {
          required: isRequired,
          message: `${DEFAULT_VALIDATE_MESSAGE} column title`,
        },
      ],
    },
  ];

  const FormFields = columnFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name} style={{ marginBottom: 0 }}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
