import React from "react";

import { Button, Form, Modal } from "antd";

import { useFormsUpdateQuery } from "shared/lib/hooks/use-forms-update-query";
import { useGetProjectFields } from "shared/lib/hooks/use-get-project-fields";
import { IProject } from "shared/types/IProject";

import { useUpdateProjectMutation } from "../../api/edit-project-api";

interface IEditProjectModalProps {
  isOpenEditModal: boolean;
  handleCloseEditModal: () => void;
  projectData?: IProject;
}

export const EditProjectModal = (props: IEditProjectModalProps) => {
  const { isOpenEditModal, handleCloseEditModal, projectData } = props;

  const [imageUrl, setImageUrl] = React.useState("");

  const { FormFields } = useGetProjectFields({
    formValues: projectData,
    isEdit: true,
    imageUrl,
    setImageUrl,
  });

  React.useEffect(() => {
    if (projectData?.cover) {
      setImageUrl(projectData.cover);
    }
  }, [projectData]);

  const timeoutCloseEditProjectModal = () => {
    setTimeout(() => handleCloseEditModal(), 1000);
  };

  const {
    handleUpdateEntityFinish,
    handleDeleteEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<IProject, IProject>({
    useUpdateQueryMutation: useUpdateProjectMutation,
    handleCloseUpdateForm: timeoutCloseEditProjectModal,
    entityData: projectData,
    successMutationMessage: "Main info of project was successfully updated",
    additionalParams: {
      fields: { cover: imageUrl },
    },
  });

  return (
    <Modal
      title={`Edit Main Info of Project ${projectData?.title}`}
      open={isOpenEditModal}
      onCancel={handleCloseEditModal}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={handleUpdateEntityFinish}
        onFinishFailed={handleDeleteEntityFinishFailed}
      >
        {FormFields}

        <Button
          type="primary"
          htmlType="submit"
          loading={isUpdateEntityLoading}
        >
          Done
        </Button>
      </Form>
    </Modal>
  );
};
