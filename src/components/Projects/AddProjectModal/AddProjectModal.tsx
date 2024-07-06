import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Modal } from "antd";

import { useAddProjectMutation } from "store/api/projects/projects-api";

import { projectVisibilities } from "constants/project/project-visibilities";

import { useContexts } from "hooks/general/use-contexts";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useGetProjectFields } from "hooks/projects/use-get-project-fields";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getValidateMessage } from "utils/auth/get-validate-message";
import { getCurrentDate } from "utils/general/get-current-date";

import { IProject } from "types/IProject";

interface IAddProjectModalProps {
  isAddProjectModalOpen: boolean;
  handleCloseAddProjectModal: () => void;
}

export const AddProjectModal = (props: IAddProjectModalProps) => {
  const { isAddProjectModalOpen, handleCloseAddProjectModal } = props;

  const {
    imageUrlContext: { uploadImagePath },
  } = useContexts();

  const { authUser } = useGetAuthUser();
  const { FormFields } = useGetProjectFields({ isEdit: true });

  const [
    addProject,
    {
      isSuccess: isAddProjectSuccess,
      isLoading: isAddProjectLoading,
      status: isAddProjectStatus,
      error: isAddProjectError,
    },
  ] = useAddProjectMutation();

  const handleAddProjectFinish = (formValues: IProject) => {
    const addedData = {
      ...formValues,
      id: `${Date.now()}`,
      adminUserId: authUser?.id,
      createdAt: getCurrentDate(),
      updatedAt: getCurrentDate(),
      cover: uploadImagePath,
      visibility: projectVisibilities.public,
    };

    addProject(addedData);
    setTimeout(() => handleCloseAddProjectModal(), 1000);
  };

  const handleAddProjectFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isAddProjectSuccess,
    isLoading: isAddProjectLoading,
    status: isAddProjectStatus,
    error: isAddProjectError,
    successMessage: "Project added successfully.",
  });

  return (
    <Modal
      title="Add New Project"
      open={isAddProjectModalOpen}
      onCancel={handleCloseAddProjectModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleAddProjectFinish}
        onFinishFailed={handleAddProjectFinishFailed}
      >
        {FormFields}

        <Button type="primary" htmlType="submit" loading={isAddProjectLoading}>
          Done
        </Button>
      </Form>
    </Modal>
  );
};
