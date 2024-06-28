import { Form, Input } from "antd";

import { UploadButton } from "components/UploadButton/UploadButton";

import { RouterPath } from "configs/route-config";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";
import {
  projectFieldsDataIndexes,
  projectFieldsPlaceholders,
  projectFieldsTitles,
} from "constants/project/project-list-fields";

import { IProject } from "types/IProject";

interface IUseGetProjectFieldsArgs {
  formValues?: IProject;
  isEdit?: boolean;
}

export const useGetProjectFields = (args: IUseGetProjectFieldsArgs) => {
  const { formValues, isEdit } = args;

  const location = window.location.pathname;
  const isAccountPage = location === RouterPath.account;

  const registerFieldsArray = [
    {
      label: projectFieldsTitles.image,
      name: projectFieldsDataIndexes.image,
      node: <UploadButton disabled={!isEdit} />,
    },
    {
      label: projectFieldsTitles.title,
      name: projectFieldsDataIndexes.title,
      rules: [
        {
          required: !isAccountPage,
          message: `${DEFAULT_VALIDATE_MESSAGE} title`,
        },
      ],
      node: (
        <Input
          defaultValue={formValues?.title}
          placeholder={projectFieldsPlaceholders.title}
          disabled={!isEdit}
        />
      ),
    },
    {
      label: projectFieldsTitles.description,
      name: projectFieldsDataIndexes.description,
      rules: [
        {
          required: !isAccountPage,
          message: `${DEFAULT_VALIDATE_MESSAGE} description`,
        },
      ],
      node: (
        <Input
          defaultValue={formValues?.description}
          disabled={!isEdit}
          placeholder={projectFieldsPlaceholders.description}
        />
      ),
    },
  ];

  const FormFields = registerFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
