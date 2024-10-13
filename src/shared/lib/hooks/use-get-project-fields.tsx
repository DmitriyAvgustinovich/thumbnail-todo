import { Form, Input, Radio } from "antd";

import { DEFAULT_VALIDATE_MESSAGE } from "../../consts/general";
import {
  projectFieldsDataIndexes,
  projectFieldsPlaceholders,
  projectFieldsTitles,
} from "../../consts/project-list-fields";
import { projectVisibilities } from "../../consts/project-visibilities";
import { IProject } from "../../types/IProject";
import { UploadButton } from "../../ui/UploadButton/UploadButton";

interface IUseGetProjectFieldsArgs {
  formValues?: IProject;
  handleCloseEditModal?: () => void;
  isEdit: boolean;
  imageUrl: string;
  setImageUrl: (imageUrl: string) => void;
}

export const useGetProjectFields = (args: IUseGetProjectFieldsArgs) => {
  const { formValues, isEdit, imageUrl, setImageUrl } = args;

  const location = window.location.pathname;
  const isProjectBoardPage = /^\/projects\/\d+$/.test(location);

  const projectFieldsArray = [
    {
      label: projectFieldsTitles.cover,
      name: projectFieldsDataIndexes.cover,
      node: (
        <UploadButton
          disabled={!isEdit}
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
        />
      ),
    },
    {
      label: projectFieldsTitles.title,
      name: projectFieldsDataIndexes.title,
      rules: [
        {
          required: !isProjectBoardPage,
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
          required: !isProjectBoardPage,
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
    {
      label: projectFieldsTitles.visibility,
      name: projectFieldsDataIndexes.visibility,
      rules: [
        {
          required: !isProjectBoardPage,
          message: `${DEFAULT_VALIDATE_MESSAGE} visibility`,
        },
      ],
      node: (
        <Radio.Group defaultValue={formValues?.visibility}>
          <Radio value={projectVisibilities.private}>
            {projectVisibilities.private}
          </Radio>

          <Radio value={projectVisibilities.public}>
            {projectVisibilities.public}
          </Radio>
        </Radio.Group>
      ),
    },
  ];

  const FormFields = projectFieldsArray.map((field) => (
    <Form.Item {...field} key={field.name}>
      {field.node}
    </Form.Item>
  ));

  return { FormFields };
};
