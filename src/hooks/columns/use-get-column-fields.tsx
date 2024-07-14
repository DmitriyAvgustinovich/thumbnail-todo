import { Form, Input } from "antd";

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
}

export const useGetColumnFields = (args: IUseGetColumnFieldsArgs) => {
  const { formValues, isEdit } = args;

  const isRequired = isEdit ? false : true;

  const columnFieldsArray = [
    {
      label: columnFieldsTitles.title,
      name: columnFieldsDataIndexes.title,
      node: (
        <Input
          placeholder={columnFieldsPlaceholders.title}
          defaultValue={formValues?.title}
          allowClear
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
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
