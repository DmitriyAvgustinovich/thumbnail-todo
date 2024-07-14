import { Button, Form, Modal } from "antd";

import { useUpdateProjectMutation } from "store/api/projects/projects-api";

import { useContexts } from "hooks/general/use-contexts";
import { useFormsUpdateQuery } from "hooks/general/use-forms-update-query";
import { useGetProjectFields } from "hooks/projects/use-get-project-fields";

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
    handleCloseEditMainInfoModal,
    isEdit: true,
  });

  const timeoutCloseEditMainInfoModal = () => {
    setTimeout(() => handleCloseEditMainInfoModal(), 1000);
  };

  const {
    handleUpdateEntityFinish,
    handleMutationEntityFinishFailed,
    isUpdateEntityLoading,
  } = useFormsUpdateQuery<IProject, IProject>({
    useUpdateQueryMutation: useUpdateProjectMutation,
    handleCloseUpdateForm: timeoutCloseEditMainInfoModal,
    entityData: projectData,
    successMutationMessage: "Main info of project was successfully updated",
    additionalParams: {
      fields: {
        cover: uploadImagePath,
      },
    },
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
        onFinish={handleUpdateEntityFinish}
        onFinishFailed={handleMutationEntityFinishFailed}
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
