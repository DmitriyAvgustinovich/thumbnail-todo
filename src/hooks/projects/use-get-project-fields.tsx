import { Form, Input, Radio } from "antd";

import { UploadButton } from "components/UploadButton/UploadButton";

import {
  useGetProjectsByAdminUserIdQuery,
  useUpdateProjectMutation,
} from "store/api/projects/projects-api";

import { DEFAULT_VALIDATE_MESSAGE } from "constants/general";
import {
  projectFieldsDataIndexes,
  projectFieldsPlaceholders,
  projectFieldsTitles,
} from "constants/project/project-list-fields";
import { projectVisibilities } from "constants/project/project-visibilities";

import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";

import { IProject } from "types/IProject";

interface IUseGetProjectFieldsArgs {
  formValues?: IProject;
  handleCloseEditMainInfoModal?: () => void;
  isEdit?: boolean;
}

export const useGetProjectFields = (args: IUseGetProjectFieldsArgs) => {
  const { formValues, handleCloseEditMainInfoModal, isEdit } = args;

  const location = window.location.pathname;
  const isProjectBoardPage = /^\/projects\/\d+$/.test(location);

  const { refetch: refetchMyProject } = useGetProjectsByAdminUserIdQuery({
    adminUserId: formValues?.adminUserId ?? "",
  });

  const { handleUpdateEntityFinish } = useFormsUpdateQuery({
    useUpdateQueryMutation: useUpdateProjectMutation,
    entityData: formValues,
    successMutationMessage: "Cover successfully cleared",
    handleCloseUpdateForm: handleCloseEditMainInfoModal,
    additionalParams: {
      refetchData: refetchMyProject,
      fields: {
        cover: "",
      },
    },
  });

  const projectFieldsArray = [
    {
      label: projectFieldsTitles.cover,
      name: projectFieldsDataIndexes.cover,
      node: (
        <UploadButton
          disabled={!isEdit}
          existedImage={formValues?.cover}
          clearExistedImageUrlCallback={handleUpdateEntityFinish}
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
