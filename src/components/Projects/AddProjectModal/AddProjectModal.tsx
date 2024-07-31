import React from "react";

import { Button, Form, Modal } from "antd";

import { useAddProjectMutation } from "store/api/projects/projects-api";

import { useFormsAddQuery } from "hooks/general/use-forms-add-query";
import { useGetProjectFields } from "hooks/projects/use-get-project-fields";
import { useGetAuthUser } from "hooks/user/use-get-auth-user";

import { getCurrentDate } from "utils/general/get-current-date";

import { IProject } from "types/IProject";

interface IAddProjectModalProps {
  isAddProjectModalOpen: boolean;
  handleCloseAddProjectModal: () => void;
}

export const AddProjectModal = (props: IAddProjectModalProps) => {
  const { isAddProjectModalOpen, handleCloseAddProjectModal } = props;

  const [imageUrl, setImageUrl] = React.useState("");

  const { authUser } = useGetAuthUser();

  const { FormFields } = useGetProjectFields({
    isEdit: true,
    imageUrl,
    setImageUrl,
  });

  const timeoutCloseAddProjectModal = () => {
    setTimeout(() => handleCloseAddProjectModal(), 1000);
  };

  const {
    handleAddEntityFinish,
    handleMutationEntityFinishFailed,
    isAddEntityLoading,
  } = useFormsAddQuery<IProject>({
    useAddEntityMutation: useAddProjectMutation,
    handleCloseAddForm: timeoutCloseAddProjectModal,
    successMutationMessage: "Project added successfully",
    additionalParams: {
      fields: {
        adminUserId: authUser?.id,
        createdAt: getCurrentDate(),
        updatedAt: getCurrentDate(),
        cover: imageUrl,
      },
    },
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
        onFinish={handleAddEntityFinish}
        onFinishFailed={handleMutationEntityFinishFailed}
      >
        {FormFields}

        <Button type="primary" htmlType="submit" loading={isAddEntityLoading}>
          Done
        </Button>
      </Form>
    </Modal>
  );
};
