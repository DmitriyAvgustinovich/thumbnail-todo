import React from "react";

import { Button, Form, Modal } from "antd";

import { useFormsAddQuery } from "shared/lib/hooks/use-forms-add-query";
import { useGetAuthUser } from "shared/lib/hooks/use-get-auth-user";
import { useGetProjectFields } from "shared/lib/hooks/use-get-project-fields";
import { getCurrentDate } from "shared/lib/utils/get-current-date";
import { IProject } from "shared/types/IProject";

import { useAddProjectMutation } from "../../api/add-project-api";

interface IAddProjectModalProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
}

export const AddProjectModal = (props: IAddProjectModalProps) => {
  const { isModalOpen, handleCloseModal } = props;

  const [imageUrl, setImageUrl] = React.useState("");

  const { authUser } = useGetAuthUser();

  const { FormFields } = useGetProjectFields({
    isEdit: true,
    imageUrl,
    setImageUrl,
  });

  const timeoutCloseAddProjectModal = () => {
    setTimeout(() => handleCloseModal(), 1000);
  };

  const {
    handleAddEntityFinish,
    handleDeleteEntityFinishFailed,
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
      open={isModalOpen}
      onCancel={handleCloseModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleAddEntityFinish}
        onFinishFailed={handleDeleteEntityFinishFailed}
      >
        {FormFields}

        <Button type="primary" htmlType="submit" loading={isAddEntityLoading}>
          Done
        </Button>
      </Form>
    </Modal>
  );
};
