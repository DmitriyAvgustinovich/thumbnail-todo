import { ValidateErrorEntity } from "rc-field-form/lib/interface";

import { Button, Form, Modal } from "antd";

import { useUpdateProjectMutation } from "store/api/projects/projects-api";

import { useContexts } from "hooks/general/use-contexts";
import { useGetQueryMessages } from "hooks/general/use-get-query-messages";
import { useGetProjectFields } from "hooks/projects/use-get-project-fields";

import { getValidateMessage } from "utils/auth/get-validate-message";
import { getCurrentDate } from "utils/general/get-current-date";

import { IProject } from "types/IProject";

interface IEditMainInfoModalProps {
  openEditMainInfoModal: boolean;
  handleCloseEditMainInfoModal: () => void;
  projectData?: IProject;
}

export const EditMainInfoModal = (props: IEditMainInfoModalProps) => {
  const { openEditMainInfoModal, handleCloseEditMainInfoModal, projectData } =
    props;

  const {
    imageUrlContext: { uploadImagePath },
  } = useContexts();

  const { FormFields } = useGetProjectFields({
    formValues: projectData,
    isEdit: true,
  });

  const [
    updateProject,
    {
      isSuccess: isUpdateProjectSuccess,
      isLoading: isUpdateProjectLoading,
      status: updateProjectStatus,
      error: updateProjectError,
    },
  ] = useUpdateProjectMutation();

  const handleEditMainInfoFinish = (formValues: IProject) => {
    const updatedData = {
      ...formValues,
      id: projectData?.id ?? "",
      updatedAt: getCurrentDate(),
      cover: uploadImagePath,
    };

    updateProject(updatedData);
    setTimeout(() => handleCloseEditMainInfoModal(), 1000);
  };

  const handleEditMainInfoFinishFailed = (error: ValidateErrorEntity) => {
    getValidateMessage(error);
  };

  useGetQueryMessages({
    isSuccess: isUpdateProjectSuccess,
    isLoading: isUpdateProjectLoading,
    status: updateProjectStatus,
    error: updateProjectError,
    successMessage: "Main info of project was successfully updated.",
  });

  return (
    <Modal
      title={`Edit Main Info of Project ${projectData?.title}`}
      open={openEditMainInfoModal}
      onCancel={handleCloseEditMainInfoModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleEditMainInfoFinish}
        onFinishFailed={handleEditMainInfoFinishFailed}
      >
        {FormFields}

        <Button
          type="primary"
          htmlType="submit"
          loading={isUpdateProjectLoading}
        >
          Done
        </Button>
      </Form>
    </Modal>
  );
};
